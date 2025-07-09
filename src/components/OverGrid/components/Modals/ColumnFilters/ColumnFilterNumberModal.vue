<template>
  <CustomContentModal :show="props.columnFilters.fieldUnderAdding?.value?.columnFilter?.type == filterType"
    :title="i18n.l('column_filter_number_modal_title')" :close="props.columnFilters.closeColumnFilterConfigModal"
    :cancelButtonTitle="i18n.l('close')" :disableOkButton="!isValid" :ok="addFilter">
    <template #content>
      <div class="flex flex-col gap-3">
        <div class="flex flex-col gap-1">
          <label for="overgrid-column-filter-operation-number" class="overgrid-label text-sm">
            {{ i18n.l('operation') }}
          </label>
          <OverGridSelect id="overgrid-column-filter-operation-number" rounded="full" variant="primary" size="md"
            customClass="overgrid-select" v-model="operation" :options="[
              { key: 'eq', text: i18n.l('equals') },
              { key: 'neq', text: i18n.l('not_equals') },
              { key: 'lt', text: i18n.l('less_than') },
              { key: 'lte', text: i18n.l('less_than_equals') },
              { key: 'gt', text: i18n.l('greater_than') },
              { key: 'gte', text: i18n.l('greater_than_equals') }
            ]" />
        </div>
        <div class="flex flex-col gap-1 py-0.5">
          <label for="overgrid-column-filter-label-value" class="overgrid-label text-sm">
            {{ i18n.l('value') }}
          </label>
          <VueNumber id="overgrid-column-filter-label-value"
            class="overgrid-input overgrid-input-column-filter-number-value overgrid-input-primary text-sm px-3 py-2 rounded-full"
            :placeholder="i18n.l('please_enter_value')" v-model="value" v-bind="numberConfig" />
        </div>
      </div>
    </template>
  </CustomContentModal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import CustomContentModal from '../../CustomContentModal.vue';
import OverGridSelect from '../../FormElements/OverGridSelect.vue';
import useI18n from '../../../composables/useI18n';
import type { OverGridUseColumnFiltersInterface } from '@/components/OverGrid/types/OverGridUseColumnFiltersInterface';
import { component as VueNumber } from '@coders-tm/vue-number-format'
const i18n = useI18n();

const filterType = 'number'; // This is the type of filter we are creating in this modal

const props = defineProps<{
  columnFilters: OverGridUseColumnFiltersInterface
}>();

const numberConfig = ref({
  decimal: props.columnFilters.fieldUnderAdding.value?.columnFilter?.config?.decimal ? props.columnFilters.fieldUnderAdding.value?.columnFilter?.config?.decimal : '.',
  thousands: props.columnFilters.fieldUnderAdding.value?.columnFilter?.config?.thousands ? props.columnFilters.fieldUnderAdding.value?.columnFilter?.config?.thousands : ',',
  precision: props.columnFilters.fieldUnderAdding.value?.columnFilter?.config?.precision ? props.columnFilters.fieldUnderAdding.value?.columnFilter?.config?.precision : 2,
  min: props.columnFilters.fieldUnderAdding.value?.columnFilter?.config?.min ? props.columnFilters.fieldUnderAdding.value?.columnFilter?.config?.min : undefined,
  max: props.columnFilters.fieldUnderAdding.value?.columnFilter?.config?.max ? props.columnFilters.fieldUnderAdding.value?.columnFilter?.config?.max : undefined,
  maxlength: props.columnFilters.fieldUnderAdding.value?.columnFilter?.config?.maxlength ? props.columnFilters.fieldUnderAdding.value?.columnFilter?.config?.maxlength : undefined
});

const operation = ref<string>('cn')
const value = ref<string | number>('');

const isValid = computed<boolean>(() => {
  return value.value !== null && value.value !== '';
});

function resetForm() {
  operation.value = 'eq';
  value.value = '';
}

function addFilter() {
  if (!isValid.value || !props.columnFilters.fieldUnderAdding.value) {
    return;
  }

  props.columnFilters.registerColumnFilter({
    type: filterType,
    key: props.columnFilters.fieldUnderAdding.value.key,
    filterKey: props.columnFilters.fieldUnderAdding.value.columnFilter?.filterKey ? props.columnFilters.fieldUnderAdding.value.columnFilter.filterKey : props.columnFilters.fieldUnderAdding.value.key,
    operation: operation.value,
    value: parseFloat(value.value.toString())
  });

  setTimeout(() => {
    resetForm();
  }, 500);
}

watch(() => props.columnFilters.fieldUnderAdding?.value, (newValue) => {
  if (newValue && newValue.columnFilter?.type == filterType) { // modal is opened
    const currentFilter = props.columnFilters.returnCurrentFilter(newValue);
    if (currentFilter) {
      operation.value = currentFilter.operation;
      value.value = parseFloat(currentFilter.value);
    } else {
      resetForm();
    }
  }
});

</script>
