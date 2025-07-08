<template>
  <CustomContentModal :show="props.columnFilters.fieldUnderAdding?.value?.columnFilter?.type == filterType"
    :title="i18n.l('column_filter_date_modal_title')" :close="props.columnFilters.closeColumnFilterConfigModal"
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
        <div class="flex flex-col" v-if="operation !== 'be'">
          <label for="overgrid-value" class="overgrid-label">
            {{ i18n.l('value') }}
          </label>
          <input class="overgrid-input" type="date" v-model="value" />
        </div>
        <div class="flex flex-row gap-2" v-else>
          <div class="w-1/2 flex flex-col">
            <label for="overgrid-value" class="overgrid-label">
              {{ i18n.l('interval_start') }}
            </label>
            <input class="overgrid-input" type="date" v-model="interval1" />
          </div>
          <div class="w-1/2 flex flex-col">
            <label for="overgrid-value" class="overgrid-label">
              {{ i18n.l('interval_end') }}
            </label>
            <input class="overgrid-input" type="date" v-model="interval2" />
          </div>
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
const interval1 = ref<string>('');
const interval2 = ref<string>('');

const isValid = computed<boolean>(() => {
  if (operation.value === 'be') {
    return interval1.value !== '' && interval2.value !== '' && new Date(interval1.value) <= new Date(interval2.value);
  }
  else {
    return value.value !== null
  }
});

function resetForm() {
  operation.value = 'eq';
  value.value = '';
  interval1.value = '';
  interval2.value = '';
}

function addFilter() {
  if (!isValid.value || !props.columnFilters.fieldUnderAdding.value) {
    return;
  }

  let finalValue = value.value.toString();
  if (operation.value == 'be') {
    finalValue = interval1.value + ',' + interval2.value;
  }

  props.columnFilters.registerColumnFilter({
    type: filterType,
    key: props.columnFilters.fieldUnderAdding.value.key,
    filterKey: props.columnFilters.fieldUnderAdding.value.columnFilter?.filterKey ? props.columnFilters.fieldUnderAdding.value.columnFilter.filterKey : props.columnFilters.fieldUnderAdding.value.key,
    operation: operation.value,
    value: finalValue
  });

  setTimeout(() => {
    resetForm();
  }, 500);
}

watch(() => props.columnFilters.fieldUnderAdding?.value, (newValue) => {
  if (newValue && newValue.columnFilter?.type == filterType) { // modal is opened
    const currentFilter = props.columnFilters.returnCurrentFilter(newValue);
    if (currentFilter) {
      if (currentFilter.operation === 'be') {
        operation.value = currentFilter.operation;
        value.value = '';
        const intervalValues = currentFilter.value.split(',');
        interval1.value = intervalValues[0] || '';
        interval2.value = intervalValues[1] || '';
      } else {
        operation.value = currentFilter.operation;
        value.value = currentFilter.value;
      }
    } else {
      resetForm();
    }
  }
});

</script>
