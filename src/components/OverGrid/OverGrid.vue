<template>
  <div class="overgrid relative" :data-theme="props.config.theme || 'default'"
    :grid-unique-id="props.config.gridUniqueId">
    <div class="overgrid-toolbar flex flex-row">
      <span>@TODO: Filtering</span>
      <span class="overgrid-toolbar-spacer hidden lg:flex grow"></span>
      <button v-if="props.config.refreshable?.manualActive" @click="records.fetchRecords"
        class="overgrid-btn overgrid-btn-manual-refresh">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      </button>
      <BulkOperationsDropdown
        v-if="props.config.bulkOperations && props.config.bulkOperations.active && props.config.bulkOperations.methods?.length > 0 && props.config.idkey"
        :config="props.config.bulkOperations" :bulkOperator="bulkOperations" />
      <Dropdown :orientation="((clientWidth < 640) ? 'right' : 'left')" ref="operationsDropdown"
        class="overgrid-operations-dropdown">
        <template #content>
          <BaseOperations :config="props.config" :columnSelector="columnSelector"
            :currentPageExporter="currentPageExporter" :aboutModal="aboutModal" />
          <AutoRefresh :autoRefresher="records.autoRefresh"
            v-if="props.config?.refreshable && props.config?.refreshable.autoActive"
            :config="props.config?.refreshable" />
          <PageSize :paginator="records.pagination"
            v-if="props.config?.pagination && props.config?.pagination.active && props.config?.pagination.possiblePageSizes"
            :config="props.config?.pagination" />
        </template>
      </Dropdown>
    </div>
    <table class="w-full">
      <thead class="overgrid-header">
        <tr>
          <th class="overgrid-cell overgrid-checkbox-cell"
            v-if="props.config.bulkOperations && props.config.bulkOperations.active && props.config.bulkOperations.methods?.length > 0 && props.config.idkey">
            <label class="">
            </label>
          </th>
          <th class="overgrid-cell" v-for="titleField in columnSelector.filter(fields.mappingVisible())"
            :key="'head_' + titleField.key">
            <div class="flex flex-row items-center">
              <span class="overgrid-column-title">{{ titleField.title }}</span>
              <div v-if="props.config.orderConfiguration?.active" class="overgrid-orderer-base">
                <Orderer :orderer="records.ordering" :field="titleField" :config="props.config.orderConfiguration" />
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="overgrid-body">
        <tr v-for="(record, index) in records.records.value" :key="'record_' + index">
          <td class="overgrid-cell overgrid-checkbox-cell"
            v-if="props.config.bulkOperations && props.config.bulkOperations.active && props.config.bulkOperations.methods?.length > 0 && props.config.idkey">
            <label class="overgrid-checkbox-label">
              <input :value="record[props.config.idkey]?.toString()" v-model="bulkOperations.checkedRows.value"
                class="overgrid-checkbox" type="checkbox" />
            </label>
          </td>
          <td class="overgrid-cell" v-for="bodyField in columnSelector.filter(fields.mappingVisible())"
            :key="'body_' + bodyField.key">
            {{ record[bodyField.key] }}
          </td>
        </tr>
      </tbody>
    </table>

    <Paginator :paginator="records.pagination" v-if="props.config.pagination?.active" />

    <div v-if="records.loading.value"
      class="overgrid-ui-loader absolute w-full h-full top-0 left-0 flex items-center justify-center">
      <span class="overgrid-ui-loader-message">{{ i18n.l('loading_data') }}</span>
    </div>

    <!-- MODALS -->
    <ColumnSelectorModal :mappingVisible="fields.mappingVisible()" :columnSelector="columnSelector" />
    <CurrentPageExporterModal :currentPageExporterConfig="props.config.currentPageExport"
      :mappingVisible="columnSelector.filter(fields.mappingVisible())" :currentPageExporter="currentPageExporter"
      :currentRecords="records.records" />
    <AboutModal :aboutModal="aboutModal" />
    <!-- MODALS -->
  </div>
</template>

<script lang="ts" setup>
import Paginator from './components/Paginator.vue';
import Orderer from './components/Orderer.vue';
import Dropdown from './components/Dropdown.vue';
import BaseOperations from './components/ToolbarSections/BaseOperations.vue';
import AutoRefresh from './components/ToolbarSections/AutoRefresh.vue';
import PageSize from './components/ToolbarSections/PageSize.vue';
import ColumnSelectorModal from './components/Modals/ColumnSelectorModal.vue';
import CurrentPageExporterModal from './components/Modals/CurrentPageExporterModal.vue';
import AboutModal from './components/Modals/AboutModal.vue';
import { onMounted } from 'vue';
import useFields from './composables/useFields';
import useRecords from './composables/useRecords';
import type { OverGridConfig } from './types/OverGridConfig';
import { ref } from 'vue';
import useI18n from './composables/useI18n';
import './themes/default.css'
import useColumnSelector from './composables/useColumnSelector';
import useCurrentPageExport from './composables/useCurrentPageExport';
import useAboutModal from './composables/useAboutModal';
import useBulkOperations from './composables/useBulkOperations';
import BulkOperationsDropdown from './components/BulkOperationsDropdown.vue';

const props = defineProps<{
  config: OverGridConfig;
}>();

const clientWidth = ref(document.documentElement.clientWidth)
const i18n = useI18n(props.config.locale || 'en');
const fields = useFields();
const records = useRecords(props.config);
const columnSelector = useColumnSelector(props.config.columnSelector, props.config.gridUniqueId);
const currentPageExporter = useCurrentPageExport(props.config.currentPageExport);
const aboutModal = useAboutModal();
const bulkOperations = useBulkOperations(props.config.bulkOperations, props.config.idkey);

onMounted(() => {
  records.fetchRecords();
})

defineExpose({
  fields
});

</script>
