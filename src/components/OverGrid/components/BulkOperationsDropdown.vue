<template>
  <select :disabled="props.bulkOperator.checkedRows.value.length <= 0" v-model="selectedBulkMethod"
    @change="onBulkMethod" class="disabled:opacity-40 overgrid-select">
    <option v-if="props.bulkOperator.checkedRows.value.length <= 0" value="null">{{ i18n.l('bulk_method') }}</option>
    <option v-else value="null">{{ i18n.l('selected_rows', {
      selectedCount:
        props.bulkOperator.checkedRows.value.length.toString()
    }) }}</option>
    <option v-for="method in props.config.methods" :value="method.key" :key="method.key">{{ method.title }}</option>
  </select>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { OverGridUseBulkOperationsInterface } from '../types/OverGridUseBulkOperationsInterface';
import type { OverGridBulkOperationsConfig } from '../types/OverGridBulkOperationsConfig';
import useI18n from '../composables/useI18n';

const i18n = useI18n();
const props = defineProps<{
  config: OverGridBulkOperationsConfig;
  bulkOperator: OverGridUseBulkOperationsInterface;
}>();

const selectedBulkMethod = ref<string | null>(null);

function onBulkMethod() {
  let actionFn;
  for (var i in props.config.methods) {
    if (props.config.methods[i].key == selectedBulkMethod.value) {
      actionFn = props.config.methods[i].action;
      break;
    }
  }

  if (actionFn) {
    actionFn(props.bulkOperator.checkedRows.value, () => {
      selectedBulkMethod.value = null;
      props.bulkOperator.checkedRows.value = [];
    });
  }
}

</script>
