<template>
  <CustomContentModal :show="props.columnFilters.fieldUnderAdding?.value?.columnFilter?.type == filterType"
    :title="i18n.l('column_filter_number_modal_title')" :close="props.columnFilters.closeColumnFilterConfigModal"
    :cancelButtonTitle="i18n.l('close')" :disableOkButton="!isValid" :ok="addFilter">
    <template #content>
      <div class="flex flex-col">
        <div class="flex flex-col">
          <label for="overgrid-operation" class="overgrid-label">
            {{ i18n.l('operation') }}
          </label>
          <select id="overgrid-operation" class="overgrid-select" v-model="operation">
            <option value="eq">{{ i18n.l('equals') }}</option>
            <option value="neq">{{ i18n.l('not_equals') }}</option>
            <option value="lt">{{ i18n.l('less_than') }}</option>
            <option value="lte">{{ i18n.l('less_than_equals') }}</option>
            <option value="gt">{{ i18n.l('greater_than') }}</option>
            <option value="gte">{{ i18n.l('greater_than_equals') }}</option>
          </select>
        </div>
        <div class="flex flex-col">
          <label for="overgrid-value" class="overgrid-label">
            {{ i18n.l('value') }}
          </label>
          <VueNumber class="overgrid-input" :placeholder="i18n.l('please_enter_value')" v-model="value"
            v-bind="numberConfig" />
        </div>
      </div>
    </template>
  </CustomContentModal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import CustomContentModal from '../../CustomContentModal.vue';
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
  return value.value !== null;
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
