<template>
  <span :class="formatterConfig?.config?.class || ''">
    {{ data }}
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
