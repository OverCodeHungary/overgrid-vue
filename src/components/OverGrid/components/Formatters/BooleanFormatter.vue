<template>
  {{ data ? formatterConfig.config?.trueText ? formatterConfig.config?.trueText : l('yes') :
    formatterConfig.config?.falseText ? formatterConfig.config?.falseText : l('no') }}
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
