<template>
  <span :class="formatterConfig?.config?.class || ''">
    {{ formattedData }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  data: any,
  l: Function,
  formatterConfig: {
    type: string,
    config?: any
  },
  rowid: string | number,
  fieldKey: string,
  record: any,
  refreshGrid: Function,
  openExtraRow: Function
}>()

const formattedData = computed(() => {
  if (!props.data) return "";
  let result = parseFloat(props.data).toLocaleString(
    props.formatterConfig?.config?.locale ? props.formatterConfig?.config?.locale : 'en-EN',
    {
      minimumFractionDigits: props.formatterConfig?.config?.minimumFractionDigits || 0,
      maximumFractionDigits: props.formatterConfig?.config?.maximumFractionDigits || 2,
      useGrouping: props.formatterConfig?.config?.useGrouping !== undefined && typeof props.formatterConfig?.config?.useGrouping == 'boolean' ? props.formatterConfig?.config?.useGrouping : true
    }
  )
  return result;
});

</script>
