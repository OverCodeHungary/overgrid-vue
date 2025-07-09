<template>
  <div class="flex flex-col items-center gap-0.5 justify-center relative">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
      class="h-4 -mb-2 overgrid-sort-icon opacity-20"
      :class="[{ 'overgrid-sort-icon-active opacity-100': props.direction === 'ASC' }]">
      <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
      class="h-4 overgrid-sort-icon  opacity-20"
      :class="[{ 'overgrid-sort-icon-active opacity-100': props.direction === 'DESC' }]">
      <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps<{
  direction: string
}>();
</script>
