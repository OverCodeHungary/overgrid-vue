<template>
  <span v-if="!Array.isArray(data)" :class="formatterConfig?.config?.mapping?.[data]?.class || ''">
    {{ formatterConfig?.config?.mapping?.[data]?.title ? formatterConfig?.config?.mapping?.[data]?.title : data }}
  </span>
  <span class="flex flex-row gap-1" v-else>
    <span v-for="(item, index) in data" :key="index" :class="formatterConfig?.config?.mapping?.[item]?.class || ''">
      {{ formatterConfig?.config?.mapping?.[item]?.title ? formatterConfig?.config?.mapping?.[item]?.title : item }}
    </span>
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
