<template>
  <CustomContentModal :show="props.currentPageExporter.isModalShown" :title="i18n.l('column_selector')"
    :close="() => { props.currentPageExporter.closeModal() }" :ok="exportColumns">
    <template #content>
      <h4 class="font-bold overgrid-modal-subtitle">
        {{ i18n.l('export_fields') }}
      </h4>
      <div class="grid grid-cols-2 gap-2 overgrid-checkbox-nest">
        <label class="flex items-center overgrid-checkbox-label" v-for="(overGridField, index) in props.mappingVisible"
          :key="index">
          <span class="flex flex-row items-center gap-2" v-if="overGridField.title != ''">
            <input :disabled="!overGridField.selectable" v-model="selectedFields" :value="overGridField.key"
              class="overgrid-checkbox" type="checkbox" />
            <p :class="[{ 'opacity-40': !overGridField.selectable }]" class="cursor-pointer">{{ overGridField.title
            }}</p>
          </span>
        </label>
      </div>

      <h4 class="font-bold overgrid-modal-subtitle mt-4">
        {{ i18n.l('export_format') }}
      </h4>
      <div class="flex flex-col items-start overgrid-radio-nest">
        <label v-if="props.currentPageExporterConfig?.xlsxEnabled"
          class="flex flex-row gap-2 items-center overgrid-radio-label">
          <input type="radio" v-model="format" value="xlsx" class="overgrid-radio">
          <p class="cursor-pointer">XLSX</p>
        </label>
        <label v-if="props.currentPageExporterConfig?.csvEnabled"
          class="flex flex-row gap-2 items-center overgrid-radio-label">
          <input type="radio" v-model="format" value="csv" class="overgrid-radio">
          <p class="cursor-pointer">CSV</p>
        </label>
      </div>
      <jsonExcel :data="sheetData" :name="'data-export-' + moment().unix() + '.' + format" :type="format"
        :fields="headers" @click="finishDownload">
        <button class="hidden" ref="downloadButton">
          <span>{{ i18n.l('ok') }}</span>
        </button>
      </jsonExcel>
    </template>
  </CustomContentModal>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue';
import type { Ref } from 'vue';
import { OverGridField } from '../../types/OverGridField';
import CustomContentModal from '../CustomContentModal.vue';
import type { OverGridUseCurrentPageExportInterface } from '../../types/OverGridUseCurrentPageExportInterface';
import useI18n from '../../composables/useI18n';
import type { OverGridCurrentPageExportConfig } from '../../types/OverGridCurrentPageExportConfig';
import jsonExcel from 'vue-json-excel3';
import moment from 'moment';
const i18n = useI18n();

const downloadButton = ref<HTMLButtonElement | null>(null);

const props = defineProps<{
  currentPageExporterConfig: OverGridCurrentPageExportConfig | undefined,
  mappingVisible: OverGridField[],
  currentPageExporter: OverGridUseCurrentPageExportInterface,
  currentRecords: Ref<any[]>
}>();

const selectedFields = ref<string[]>([])
const format = ref<'xlsx' | 'csv'>('xlsx'); // default format

function exportColumns() {
  downloadButton.value?.click();
}

watch(() => props.currentPageExporter.isModalShown.value, (newValue) => {
  if (newValue) { // set selected fields when modal is shown
    selectedFields.value = props.mappingVisible.map(field => field.key);
  }
}, { immediate: true });

function getFieldConfigByKey(key: string): OverGridField | undefined {
  return props.mappingVisible.find(field => field.key === key);
}

const headers = computed(() => {
  let headerFields: string[] = selectedFields.value;

  let headers: any = {};
  for (let i in headerFields) {
    let titleIfAny = props.mappingVisible.find(field => field.key === headerFields[i])?.title;
    if (titleIfAny) {
      headers[titleIfAny] = headerFields[i].split('.').join('');
    }
  }

  return headers;
})

const sheetData = computed(() => { // TODO: Write tests for this!
  let headerFields: string[] = selectedFields.value;

  let sheetData: Record<string, any>[] = [];
  for (let i in props.currentRecords.value) {
    let cSheetData: Record<string, any> = {};
    for (let j in headerFields) {
      let fieldConfig = getFieldConfigByKey(headerFields[j]);
      let cKey = headerFields[j].split('.').join('');
      if (props.currentRecords.value[i][cKey] != undefined) {
        let rawContent = props.currentRecords.value[i][cKey];
        if (rawContent !== undefined) {
          if (fieldConfig?.exportMiddleware) { // If exportMiddleware is set, use it
            rawContent = fieldConfig.exportMiddleware(rawContent, props.currentRecords.value[i], format.value);
          }
          else {
            if (fieldConfig?.middleware) { // If exportMiddleware is NOT set, use middleware if available
              rawContent = fieldConfig.middleware(rawContent, props.currentRecords.value[i]);
            }
          }

          let formatterConfig = fieldConfig?.formatter;
          if (formatterConfig) { // @TODO: Write tests!
            switch (formatterConfig.type) {
              case 'Boolean':
                rawContent = rawContent ? i18n.l('Yes') : i18n.l('No');
                break;
              case 'Status':
                rawContent = formatterConfig.config?.mapping[rawContent]?.title ? formatterConfig.config?.mapping[rawContent]?.title : rawContent;
                break;
            }
          }

          cSheetData[cKey] = rawContent;
        }
        else {
          cSheetData[cKey] = "";
        }
      }
      else {
        cSheetData[cKey] = "";
      }
    }
    sheetData.push(cSheetData);
  }

  return sheetData.length > 0 ? sheetData : [{}];
})

function finishDownload() {
  props.currentPageExporter.closeModal();
}

</script>
