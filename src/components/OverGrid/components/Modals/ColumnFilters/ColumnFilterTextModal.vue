<template>
  <CustomContentModal :show="props.columnFilters.fieldUnderAdding?.value?.columnFilter?.type == filterType"
    :title="i18n.l('column_filter_text_modal_title')" :close="props.columnFilters.closeColumnFilterConfigModal"
    :cancelButtonTitle="i18n.l('close')" :disableOkButton="!isValid" :ok="addFilter">
    <template #content>
      <div class="flex flex-col">
        <div class="flex flex-col">
          <label for="overgrid-operation" class="overgrid-label">
            {{ i18n.l('operation') }}
          </label>
          <select id="overgrid-operation" class="overgrid-select" v-model="operation">
            <option value="cn">{{ i18n.l('contains') }}</option>
            <option value="ncn">{{ i18n.l('not_contains') }}</option>
            <option value="eq">{{ i18n.l('equals') }}</option>
            <option value="neq">{{ i18n.l('not_equals') }}</option>
            <option value="sw">{{ i18n.l('starts_with') }}</option>
            <option value="nsw">{{ i18n.l('not_starts_with') }}</option>
            <option value="ew">{{ i18n.l('ends_with') }}</option>
            <option value="new">{{ i18n.l('not_ends_with') }}</option>
          </select>
        </div>
        <div class="flex flex-col">
          <label for="overgrid-value" class="overgrid-label">
            {{ i18n.l('value') }}
          </label>
          <input id="overgrid-value" type="text" class="overgrid-input" v-model="value"
            :placeholder="i18n.l('please_enter_value')" />
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

const filterType = 'text'; // This is the type of filter we are creating in this modal

const props = defineProps<{
  columnFilters: OverGridUseColumnFiltersInterface
}>();

const operation = ref<string>('cn')
const value = ref<string>('');

const isValid = computed<boolean>(() => {
  return value.value.trim() !== '';
});

function resetForm() {
  operation.value = 'cn';
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
    value: value.value.trim()
  });

  resetForm();
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
