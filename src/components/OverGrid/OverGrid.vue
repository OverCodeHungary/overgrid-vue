<template>
  <div class="overgrid relative" :data-theme="props.config.theme || 'default'"
    :grid-unique-id="props.config.gridUniqueId">
    <div class="overgrid-toolbar flex flex-row">
      <SearchSection v-if="props.config.search?.active" :searchConfig="props.config.search"
        :searcher="records.search" />
      <span class="overgrid-toolbar-spacer flex grow"></span>
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
        <template #iconButton>
          <button class="overgrid-btn overgrid-operations-btn">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </template>
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
          <th class="overgrid-cell overgrid-extra-row-cell"
            v-if="props.config.extraRow && props.config.extraRow.active && props.config.idkey">
            <label class="">
            </label>
          </th>
          <th class="overgrid-cell overgrid-checkbox-cell"
            v-if="props.config.bulkOperations && props.config.bulkOperations.active && props.config.bulkOperations.methods?.length > 0 && props.config.idkey">
            <label class="">
            </label>
          </th>
          <th class="overgrid-cell" v-for="titleField in columnSelector.filter(fields.mappingVisible())"
            :key="'head_' + titleField.key">
            <div class="flex flex-row items-center overgrid-column-title-container cursor-pointer"
              @click="() => records.ordering.toggleField(titleField)">
              <span class="overgrid-column-title">{{ titleField.title }}</span>
              <span class="grow"></span>
              <div v-if="props.config.orderConfiguration?.active" class="overgrid-orderer-container">
                <Orderer :orderer="records.ordering" :field="titleField" :config="props.config.orderConfiguration" />
              </div>
              <div v-if="props.config.columnFilters?.active && titleField.columnFilter?.active"
                class="overgrid-column-filters-container">
                <ColumnFilter :columnFilter="records.columnFilters" :field="titleField"
                  :config="props.config.columnFilters" />
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="overgrid-body">
        <template v-for="(record, index) in records.records.value" :key="'record_' + index">
          <tr :class="rowHighlighter.getClassList(record)">
            <td class="overgrid-cell overgrid-extra-row-cell"
              v-if="props.config.extraRow && props.config.extraRow.active && props.config.idkey">
              <button @click="extraRow.toggleRow(record[props.config.idkey]?.toString())"
                class="overgrid-btn overgrid-btn-extra-row">
                <svg v-if="!extraRow.isRowOpened(record[props.config.idkey]?.toString())"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </td>
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
          <Transition name="overgrid-anim-extra-row">
            <tr class="overgrid-extra-row"
              v-if="props.config.extraRow && props.config.extraRow.active && props.config.idkey"
              v-show="extraRow.isRowOpened(record[props.config.idkey]?.toString())">
              <td
                :colspan="columnSelector.filter(fields.mappingVisible()).length + (props.config.bulkOperations && props.config.bulkOperations.active && props.config.bulkOperations.methods?.length > 0 && props.config.idkey ? 1 : 0) + 1">
                <slot v-bind:record="record" v-bind:extraSlotParams="props.config.extraRow?.extraSlotParams"
                  name="extraRow"></slot>
              </td>
            </tr>
          </Transition>
        </template>
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
import SearchSection from './components/SearchSection.vue';
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
import useRowHighlighter from './composables/useRowHighlighter';
import useAboutModal from './composables/useAboutModal';
import useBulkOperations from './composables/useBulkOperations';
import BulkOperationsDropdown from './components/BulkOperationsDropdown.vue';
import useExtraRow from './composables/useExtraRow';

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
const extraRow = useExtraRow(props.config.extraRow, props.config.idkey);
const rowHighlighter = useRowHighlighter(props.config.rowHighlighter);

onMounted(() => {
  records.fetchRecords();
})

defineExpose({
  fields
});

</script>
