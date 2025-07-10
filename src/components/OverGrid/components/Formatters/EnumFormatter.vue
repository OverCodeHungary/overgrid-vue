<template>
  <span :class="formatterConfig?.config?.mapping?.[data]?.class || ''">
    {{ formatterConfig?.config?.mapping?.[data]?.title ? formatterConfig?.config?.mapping?.[data]?.title : data }}
  </span>
</template>

<script setup lang="ts">
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
</script>
