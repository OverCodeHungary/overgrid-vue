<template>
  <div class="flex flex-row">
    <button class="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-35" @click="paginator.firstPage"
      :disabled="!paginator.hasPreviousPage()">
      First
    </button>
    <button class="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-35" @click="paginator.previousPage"
      :disabled="!paginator.hasPreviousPage()">
      Previous
    </button>
    <span class="mx-2">
      Page {{ paginator.currentPageForUI }} of {{ paginator.state.totalPages }}
    </span>
    <button class="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-35" @click="paginator.nextPage"
      :disabled="!paginator.hasNextPage()">
      Next
    </button>
    <button class="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-35" @click="paginator.lastPage"
      :disabled="!paginator.hasNextPage()">
      Last
    </button>
  </div>
</template>

<script lang="ts" setup>
import type { OverGridUsePaginationInterface } from '../types/OverGridUsePaginationInterface';
const props = defineProps<{
  paginator: OverGridUsePaginationInterface
}>();

</script>
