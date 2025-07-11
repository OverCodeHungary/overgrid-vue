<template>
  <div class="overgrid relative w-full max-w-full" :data-theme="props.config.theme || 'default'"
    :grid-unique-id="props.config.gridUniqueId">
    <div class="overgrid-toolbar flex flex-row h-12 items-center justify-center">
      <SearchSection v-if="props.config.search?.active" :searchConfig="props.config.search"
        :searcher="records.search" />
      <span class="overgrid-toolbar-spacer flex grow"></span>
      <div class="flex flex-row gap-2 items-center justify-center overgrid-toolbar-right-section">
        <BulkOperationsDropdown
          v-if="props.config.bulkOperations && props.config.bulkOperations.active && props.config.bulkOperations.methods?.length > 0 && props.config.idkey && bulkOperations.checkedRows.value.length > 0"
          :config="props.config.bulkOperations" :bulkOperator="bulkOperations" />
        <OverGridBtn v-if="props.config.refreshable?.manualActive" @click="records.fetchRecords"
          customClass="overgrid-btn-manual-refresh" variant="primary" size="sm" iconOnly rounded>
          <template #iconLeft>
            <OverGridIcon type="refresh" class="w-4 h-4" />
          </template>
        </OverGridBtn>
        <Dropdown :orientation="'left'" ref="operationsDropdown" class="overgrid-operations-dropdown">
          <template #iconButton>
            <OverGridBtn v-if="props.config.refreshable?.manualActive" customClass="overgrid-btn-operations"
              variant="primary" size="sm" iconOnly rounded>
              <template #iconLeft>
                <OverGridIcon type="horizontal-dots" class="w-4 h-4" />
              </template>
            </OverGridBtn>
          </template>
          <template #content>
            <BaseOperations :config="props.config" :columnSelector="columnSelector"
              :currentPageExporter="currentPageExporter" :aboutModal="aboutModal"
              :closeDropdown="operationsDropdown?.close" />
            <AutoRefresh :autoRefresher="records.autoRefresh"
              v-if="props.config?.refreshable && props.config?.refreshable.autoActive"
              :config="props.config?.refreshable" :closeDropdown="operationsDropdown?.close" />
            <PageSize :paginator="records.pagination"
              v-if="props.config?.pagination && props.config?.pagination.active && props.config?.pagination.possiblePageSizes"
              :config="props.config?.pagination" :closeDropdown="operationsDropdown?.close" />
          </template>
        </Dropdown>
      </div>
    </div>
    <div class="overgrid-scroller w-full max-w-full overflow-x-auto">
      <table class="overgrid-table w-full rounded-xl overflow-hidden">
        <thead class="overgrid-header h-12">
          <tr>
            <th class="overgrid-cell h-12 overgrid-extra-row-cell text-sm w-12"
              v-if="props.config.extraRow && props.config.extraRow.active && props.config.idkey">
              <label class="">
              </label>
            </th>
            <th class="overgrid-cell h-12 overgrid-checkbox-cell text-sm w-12"
              v-if="props.config.bulkOperations && props.config.bulkOperations.active && props.config.bulkOperations.methods?.length > 0 && props.config.idkey">
              <label class="">
              </label>
            </th>
            <th class="overgrid-cell text-sm h-12" v-for="titleField in columnSelector.filter(fields.mappingVisible())"
              :key="'head_' + titleField.key">
              <div class="flex flex-row items-center overgrid-column-title-container h-12 px-4"
                :style="{ width: titleField.width || 'auto' }" @click="() => records.ordering.toggleField(titleField)"
                :class="{ 'overgrid-column-title-container-hoverable cursor-pointer': props.config.orderConfiguration?.active && titleField.orderable }">
                <span class="overgrid-column-title whitespace-nowrap">{{ titleField.title }}</span>
                <span class="grow min-w-3"></span>
                <div class="flex flex-row items-center justify-center gap-2">
                  <div v-if="props.config.orderConfiguration?.active && titleField.orderable"
                    class="overgrid-orderer-container flex flex-row items-center justify-center">
                    <Orderer :orderer="records.ordering" :field="titleField"
                      :config="props.config.orderConfiguration" />
                  </div>
                  <div v-if="props.config.columnFilters?.active && titleField.columnFilter?.active"
                    class="overgrid-column-filters-container flex flex-row items-center justify-center">
                    <ColumnFilter :columnFilter="records.columnFilters" :field="titleField"
                      :config="props.config.columnFilters" />
                  </div>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="overgrid-body">
          <template v-for="(record, index) in records.records.value" :key="'record_' + index">
            <tr class="overgrid-row h-12" :class="rowHighlighter.getClassList(record)">
              <td class="overgrid-cell px-4 overgrid-btn-extra-row text-sm"
                v-if="props.config.extraRow && props.config.extraRow.active && props.config.idkey">
                <OverGridBtn @click="extraRow.toggleRow(record[props.config.idkey]?.toString())"
                  customClass="overgrid-btn-manual-refresh" variant="light" size="sm" iconOnly rounded>
                  <template #iconLeft>
                    <OverGridIcon v-if="!extraRow.isRowOpened(record[props.config.idkey]?.toString())"
                      type="chevron-right" class="w-3 h-3" />
                    <OverGridIcon v-else type="chevron-down" class="w-3 h-3" />
                  </template>
                </OverGridBtn>
              </td>
              <td class="overgrid-cell px-4 overgrid-checkbox-cell text-sm"
                v-if="props.config.bulkOperations && props.config.bulkOperations.active && props.config.bulkOperations.methods?.length > 0 && props.config.idkey">
                <label class="overgrid-checkbox-label flex items-center justify-center">
                  <OverGridCheckbox :value="record[props.config.idkey]?.toString()"
                    v-model="bulkOperations.checkedRows.value" variant="secondary" />
                </label>
              </td>
              <td class="overgrid-cell px-4 text-sm" v-for="bodyField in columnSelector.filter(fields.mappingVisible())"
                :key="'body_' + bodyField.key">
                <template
                  v-if="bodyField.formatter && typeof bodyField.formatter == 'object' && bodyField.formatter.type">
                  <RootFormatter :theme="props.config.theme ? props.config.theme : 'default'"
                    :type="bodyField.formatter.type"
                    :data="bodyField.middleware ? bodyField.middleware(record[bodyField.key], record) : record[bodyField.key]"
                    :formatterConfig="bodyField.formatter"
                    :rowid="props.config.idkey ? record[props.config.idkey] : null" :fieldKey="bodyField.key"
                    :record="record" :refreshGrid="() => { records.fetchRecords() }"
                    :customFormatters="props.customFormatters"
                    :openExtraRow="(recordId: any) => { if (props.config.idkey) { extraRow.toggleRow(recordId) } }" />
                </template>
                <template v-else>
                  {{ bodyField.middleware ? bodyField.middleware(record[bodyField.key], record) : record[bodyField.key]
                  }}
                </template>
              </td>
            </tr>
            <Transition name="overgrid-anim-extra-row">
              <tr class="overgrid-extra-row"
                v-if="props.config.extraRow && props.config.extraRow.active && props.config.idkey"
                v-show="extraRow.isRowOpened(record[props.config.idkey]?.toString())">
                <td class="overgrid-extra-row"
                  :colspan="columnSelector.filter(fields.mappingVisible()).length + (props.config.bulkOperations && props.config.bulkOperations.active && props.config.bulkOperations.methods?.length > 0 && props.config.idkey ? 1 : 0) + 1">
                  <slot v-bind:record="record" v-bind:extraSlotParams="props.config.extraRow?.extraSlotParams"
                    name="extraRow">
                  </slot>
                </td>
              </tr>
            </Transition>
          </template>
        </tbody>
      </table>
    </div>

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
    <ColumnFilterTextModal :columnFilters="records.columnFilters" />
    <ColumnFilterNumberModal :columnFilters="records.columnFilters" />
    <ColumnFilterDateModal :columnFilters="records.columnFilters" />
    <ColumnFilterBooleanModal :columnFilters="records.columnFilters" />
    <ColumnFilterEnumModal :columnFilters="records.columnFilters" />
    <!-- MODALS -->
  </div>
</template>

<script lang="ts" setup>
import Paginator from './components/Paginator.vue';
import Orderer from './components/Orderer.vue';
import ColumnFilter from './components/ColumnFilter.vue';
import Dropdown from './components/Dropdown.vue';
import BaseOperations from './components/ToolbarSections/BaseOperations.vue';
import AutoRefresh from './components/ToolbarSections/AutoRefresh.vue';
import PageSize from './components/ToolbarSections/PageSize.vue';
import ColumnSelectorModal from './components/Modals/ColumnSelectorModal.vue';
import CurrentPageExporterModal from './components/Modals/CurrentPageExporterModal.vue';
import ColumnFilterTextModal from './components/Modals/ColumnFilters/ColumnFilterTextModal.vue';
import ColumnFilterNumberModal from './components/Modals/ColumnFilters/ColumnFilterNumberModal.vue';
import ColumnFilterDateModal from './components/Modals/ColumnFilters/ColumnFilterDateModal.vue';
import ColumnFilterBooleanModal from './components/Modals/ColumnFilters/ColumnFilterBooleanModal.vue';
import ColumnFilterEnumModal from './components/Modals/ColumnFilters/ColumnFilterEnumModal.vue';
import OverGridCheckbox from './components/FormElements/OverGridCheckbox.vue';
import OverGridBtn from './components/OverGridBtn.vue';
import OverGridIcon from './components/OverGridIcon.vue';
import SearchSection from './components/SearchSection.vue';
import AboutModal from './components/Modals/AboutModal.vue';
import { onMounted } from 'vue';
import useFields from './composables/useFields';
import useRecords from './composables/useRecords';
import type { OverGridConfig } from './types/OverGridConfig';
import { ref } from 'vue';
import useI18n from './composables/useI18n';
import './themes/default.css'
import './themes/pink.css'
import useColumnSelector from './composables/useColumnSelector';
import useCurrentPageExport from './composables/useCurrentPageExport';
import useRowHighlighter from './composables/useRowHighlighter';
import useAboutModal from './composables/useAboutModal';
import useBulkOperations from './composables/useBulkOperations';
import BulkOperationsDropdown from './components/BulkOperationsDropdown.vue';
import useExtraRow from './composables/useExtraRow';
import RootFormatter from './components/Formatters/RootFormatter.vue';

const props = defineProps<{
  config: OverGridConfig;
  customFormatters?: {
    name: string;
    component: any;
  }[];
}>();

const clientWidth = ref(document.documentElement.clientWidth)
const operationsDropdown = ref<InstanceType<typeof Dropdown> | null>(null);
const i18n = useI18n(props.config.locale || 'en');
const fields = useFields();
const records = useRecords(props.config);
const columnSelector = useColumnSelector(props.config.columnSelector, props.config.gridUniqueId);
const currentPageExporter = useCurrentPageExport(props.config.currentPageExport);
const aboutModal = useAboutModal();
const bulkOperations = useBulkOperations(props.config.bulkOperations, props.config.idkey);
const extraRow = useExtraRow(props.config.extraRow, props.config.idkey);
const rowHighlighter = useRowHighlighter(props.config.rowHighlighter);

onMounted(() => {
  records.fetchRecords();
})

defineExpose({
  fields
});

</script>
