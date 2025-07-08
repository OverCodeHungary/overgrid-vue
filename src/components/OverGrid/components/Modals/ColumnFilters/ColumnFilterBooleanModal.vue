<template>
  <CustomContentModal :show="props.columnFilters.fieldUnderAdding?.value?.columnFilter?.type == filterType"
    :title="i18n.l('column_filter_boolean_modal_title')" :close="props.columnFilters.closeColumnFilterConfigModal"
    :cancelButtonTitle="i18n.l('close')" :disableOkButton="!isValid" :ok="addFilter">
    <template #content>
      <label class="inline-flex items-center space-x-2">
        <input v-model="value" class="overgrid-checkbox" type="checkbox">
        <span>{{ i18n.l('check_if_you_want_to_filter_yes') }}</span>
      </label>
    </template>
  </CustomContentModal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import CustomContentModal from '../../CustomContentModal.vue';
import useI18n from '../../../composables/useI18n';
import type { OverGridUseColumnFiltersInterface } from '@/components/OverGrid/types/OverGridUseColumnFiltersInterface';
const i18n = useI18n();

const filterType = 'boolean'; // This is the type of filter we are creating in this modal

const props = defineProps<{
  columnFilters: OverGridUseColumnFiltersInterface
}>();

const value = ref<boolean>(false);

const isValid = computed<boolean>(() => {
  return value.value === true || value.value === false;
});

function resetForm() {
  value.value = false;
}

function addFilter() {
  if (!isValid.value || !props.columnFilters.fieldUnderAdding.value) {
    return;
  }

  props.columnFilters.registerColumnFilter({
    type: filterType,
    key: props.columnFilters.fieldUnderAdding.value.key,
    filterKey: props.columnFilters.fieldUnderAdding.value.columnFilter?.filterKey ? props.columnFilters.fieldUnderAdding.value.columnFilter.filterKey : props.columnFilters.fieldUnderAdding.value.key,
    operation: 'is',
    value: value.value
  });

  resetForm();
}

watch(() => props.columnFilters.fieldUnderAdding?.value, (newValue) => {
  if (newValue && newValue.columnFilter?.type == filterType) { // modal is opened
    const currentFilter = props.columnFilters.returnCurrentFilter(newValue);
    if (currentFilter) {
      value.value = currentFilter.value;
    } else {
      resetForm();
    }
  }
});

</script>
