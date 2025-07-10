<template>
  <span :class="formatterConfig?.config?.class || ''">
    {{ moment(data, formatterConfig?.config?.inputFormat || 'YYYY-MM-DD').format(formatterConfig?.config?.outputFormat
      || 'YYYY-MM-DD')
    }}
  </span>
</template>

<script setup lang="ts">
import moment from 'moment';
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
