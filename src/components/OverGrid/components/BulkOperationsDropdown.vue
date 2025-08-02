<template>
  <OverGridSelect rounded="full" variant="primary" size="sm" customClass="overgrid-select min-w-32 sm:min-w-48"
    :disabled="props.bulkOperator.checkedRows.value.length <= 0" v-model="selectedBulkMethod" :options="props.config?.methods ? props.config.methods.map(method => {
      return {
        key: method.key,
        text: method.title
      };
    }) : []" @change="onBulkMethod" :enableNullOption="true" :nullOptionText="i18n.l('selected_rows', {
      selectedCount:
        props.bulkOperator.checkedRows.value.length.toString()
    })" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { OverGridUseBulkOperationsInterface } from '../types/OverGridUseBulkOperationsInterface';
import type { OverGridBulkOperationsConfig } from '../types/OverGridBulkOperationsConfig';
import OverGridSelect from './FormElements/OverGridSelect.vue';
import useI18n from '../composables/useI18n';

const i18n = useI18n();
const props = defineProps<{
  config?: OverGridBulkOperationsConfig;
  bulkOperator: OverGridUseBulkOperationsInterface;
}>();

const selectedBulkMethod = ref<string | undefined>("");

function onBulkMethod() {
  let actionFn;

  if (!props.config) { return }

  for (var i in props.config.methods) {
    if (props.config.methods[i].key == selectedBulkMethod.value) {
      actionFn = props.config.methods[i].action;
      break;
    }
  }

  if (actionFn) {
    actionFn(props.bulkOperator.checkedRows.value, () => {
      selectedBulkMethod.value = "";
      props.bulkOperator.checkedRows.value = [];
    });
  }
}

</script>
