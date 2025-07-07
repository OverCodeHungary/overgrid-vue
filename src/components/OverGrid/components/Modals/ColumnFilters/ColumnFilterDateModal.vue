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
            <option value="eq">{{ i18n.l('on_this_day') }}</option>
            <option value="obd">{{ i18n.l('on_or_before_this_day') }}</option>
            <option value="bd">{{ i18n.l('before_this_day') }}</option>
            <option value="oad">{{ i18n.l('on_or_after_this_day') }}</option>
            <option value="ad">{{ i18n.l('after_this_day') }}</option>
            <option value="be">{{ i18n.l('in_this_interval') }}</option>
          </select>
        </div>
        <div class="flex flex-col">
          <label for="overgrid-value" class="overgrid-label">
            {{ i18n.l('value') }}
          </label>
          <input class="overgrid-input" type="date" v-model="value" />
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
const i18n = useI18n();

const filterType = 'date'; // This is the type of filter we are creating in this modal

const props = defineProps<{
  columnFilters: OverGridUseColumnFiltersInterface
}>();

const operation = ref<string>('eq')
const value = ref<string>('');

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
    value: value.value.toString()
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
      value.value = currentFilter.value;
    } else {
      resetForm();
    }
  }
});

</script>
