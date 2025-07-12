<template>
  <CustomContentModal :show="props.columnSelector.isModalShown.value" :title="i18n.l('column_selector')"
    :close="() => { props.columnSelector.closeModal() }" :ok="setColumns">
    <template #content>
      <div class="grid grid-cols-2 gap-2 overgrid-checkbox-nest">
        <label class="flex items-center overgrid-checkbox-label" v-for="(overGridField, index) in props.mappingVisible?.filter((field: OverGridField) => {
          return field.selectable !== false
        })" :key="index">
          <span class="flex flex-row items-center gap-2" v-if="overGridField.title != ''">
            <OverGridCheckbox :disabled="!overGridField.selectable" :value="overGridField.key" v-model="selectedFields"
              customClass="overgrid-checkbox-column-selector" variant="black" />
            <p :class="[{ 'opacity-40': !overGridField.selectable }]" class="cursor-pointer text-sm">{{
              overGridField.title
              }}</p>
          </span>
        </label>
      </div>
    </template>
  </CustomContentModal>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue';
import { OverGridField } from '../../types/OverGridField';
import type { OverGridUseColumnSelectorInterface } from '../../types/OverGridUseColumnSelectorInterface';
import CustomContentModal from '../CustomContentModal.vue';
import OverGridCheckbox from '../FormElements/OverGridCheckbox.vue';
import useI18n from '../../composables/useI18n';
const i18n = useI18n();

const selectedFields = ref<string[]>([])

const props = defineProps<{
  mappingVisible: OverGridField[],
  columnSelector: OverGridUseColumnSelectorInterface
}>();

function setColumns() {
  props.columnSelector.setColumns(selectedFields.value);
  props.columnSelector.closeModal();
}

watch(() => props.columnSelector.isModalShown.value, (newValue) => {
  if (newValue) { // set selected fields when modal is shown
    selectedFields.value = props.columnSelector.selectedFields.value ? props.columnSelector.selectedFields.value : props.mappingVisible.map(field => field.key);
  }
}, { immediate: true });


</script>
