<template>
  <CustomContentModal :show="props.columnFilters.fieldUnderAdding?.value?.columnFilter?.type == filterType"
    :title="i18n.l('column_filter_enum_modal_title')" :close="props.columnFilters.closeColumnFilterConfigModal"
    :cancelButtonTitle="i18n.l('close')" :disableOkButton="!isValid" :ok="addFilter">
    <template #content>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <label class="overgrid-checkbox-label flex items-center gap-2"
          v-for="(item, key) in props.columnFilters.fieldUnderAdding?.value?.columnFilter?.config?.mapping" :key="key">
          <input :value="key" v-model="value" class="overgrid-checkbox" type="checkbox" />
          <p class="cursor-pointer">{{ item.title }}</p>
        </label>
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

const filterType = 'enum'; // This is the type of filter we are creating in this modal

const props = defineProps<{
  columnFilters: OverGridUseColumnFiltersInterface
}>();

const value = ref<string[]>([]);

const isValid = computed<boolean>(() => {
  return value.value.length > 0;
});

function resetForm() {
  value.value = [];
}

function addFilter() {
  if (!isValid.value || !props.columnFilters.fieldUnderAdding.value) {
    return;
  }

  props.columnFilters.registerColumnFilter({
    type: filterType,
    key: props.columnFilters.fieldUnderAdding.value.key,
    filterKey: props.columnFilters.fieldUnderAdding.value.columnFilter?.filterKey ? props.columnFilters.fieldUnderAdding.value.columnFilter.filterKey : props.columnFilters.fieldUnderAdding.value.key,
    operation: 'in',
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
