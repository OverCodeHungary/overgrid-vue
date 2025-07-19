<template>
  <span class="flex flex-row gap-1 items-center" v-if="!Array.isArray(data)">
    <span class="rounded-full w-2 h-2" style="font-size: 1px;">&nbsp;</span>
    <span>{{ formatterConfig?.config?.mapping?.[data]?.title ? formatterConfig?.config?.mapping?.[data]?.title : data
      }}</span>
  </span>
  <span class="flex flex-row gap-3" v-else>
    <span class="rounded-full w-2 h-2" style="font-size: 1px;">&nbsp;</span>
    <span class="flex flex-row gap-1" v-for="(item, index) in data" :key="index"
      :class="formatterConfig?.config?.mapping?.[item]?.class || ''">
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
