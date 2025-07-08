<template>
  <div class="flex flex-row">
    <button class="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-35" @click="paginator.firstPage"
      :disabled="!paginator.hasPreviousPage()">
      {{ i18n.l('first') }}
    </button>
    <button class="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-35" @click="paginator.previousPage"
      :disabled="!paginator.hasPreviousPage()">
      {{ i18n.l('previous') }}
    </button>
    <span class="mx-2">
      {{
        i18n.l('page_n_of_m', {
          currentPage: paginator.currentPageForUI?.value.toString() || '0',
          totalPages: paginator.state.totalPages?.toString()
        })
      }}
    </span>
    <button class="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-35" @click="paginator.nextPage"
      :disabled="!paginator.hasNextPage()">
      {{ i18n.l('next') }}
    </button>
    <button class="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-35" @click="paginator.lastPage"
      :disabled="!paginator.hasNextPage()">
      {{ i18n.l('last') }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import type { OverGridUsePaginationInterface } from '../types/OverGridUsePaginationInterface';
import useI18n from '../composables/useI18n';
const i18n = useI18n();
const props = defineProps<{
  paginator: OverGridUsePaginationInterface
}>();

</script>
