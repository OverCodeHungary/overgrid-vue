<template>
  <CustomContentModal :show="props.columnSelector.isModalShown" :title="i18n.l('column_selector')"
    :close="() => { props.columnSelector.closeModal() }" :ok="setColumns">
    <template #content>
      <div class="grid grid-cols-2 gap-2 mb-5">
        <label class="inline-flex items-center mb-2" v-for="(overGridField, index) in props.mappingVisible"
          :key="index">
          <span class="flex flex-row" v-if="overGridField.title != ''">
            <input :disabled="!overGridField.selectable" v-model="selectedFields" :value="overGridField.key"
              class="overgrid-checkbox" type="checkbox" />
            <p :class="[{ 'opacity-40': !overGridField.selectable }]" class="pl-2 cursor-pointer">{{ overGridField.title
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
