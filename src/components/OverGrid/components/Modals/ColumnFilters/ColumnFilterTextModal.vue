<template>
  <CustomContentModal :show="props.columnFilters.fieldUnderAdding?.value?.columnFilter?.type == filterType"
    :title="i18n.l('column_filter_text_modal_title')" :close="props.columnFilters.closeColumnFilterConfigModal"
    :cancelButtonTitle="i18n.l('close')" :disableOkButton="!isValid" :ok="addFilter">
    <template #content>
      <div class="flex flex-col gap-3">
        <div class="flex flex-col gap-1">
          <label for="overgrid-column-filter-operation-text" class="overgrid-label text-sm">
            {{ i18n.l('operation') }}
          </label>
          <OverGridSelect id="overgrid-column-filter-operation-text" rounded="full" variant="primary" size="md"
            customClass="overgrid-select" v-model="operation" :options="[
              { key: 'cn', text: i18n.l('contains') },
              { key: 'ncn', text: i18n.l('not_contains') },
              { key: 'eq', text: i18n.l('equals') },
              { key: 'neq', text: i18n.l('not_equals') },
              { key: 'sw', text: i18n.l('starts_with') },
              { key: 'nsw', text: i18n.l('not_starts_with') },
              { key: 'ew', text: i18n.l('ends_with') },
              { key: 'new', text: i18n.l('not_ends_with') }
            ]" />
        </div>
        <div class="flex flex-col gap-1 py-0.5">
          <label for="overgrid-column-filter-value-text" class="overgrid-label text-sm">
            {{ i18n.l('value') }}
          </label>
          <OverGridInputText id="overgrid-column-filter-value-text" rounded="full" size="md" variant="primary"
            type="text" v-model="value" :placeholder="i18n.l('please_enter_value')"
            customClass="overgrid-input overgrid-input-column-filter-value" />
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
import OverGridInputText from '../../FormElements/OverGridInputText.vue';
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
