<template>
  <div class="flex flex-row gap-1 overgrid-search-container">
    <input type="text" class="overgrid-input overgrid-input-search" v-model="props.searcher.query.value"
      :placeholder="props.searchConfig?.inputPlaceholder ? props.searchConfig.inputPlaceholder : i18n.l('search')" />
    <button v-if="props.searcher.query.value" class="overgrid-btn overgrid-btn-search"
      @click="() => { props.searcher.query.value = '' }">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import useI18n from '../composables/useI18n';
import type { OverGridSearchConfig } from '../types/OverGridSearchConfig';
import type { OverGridUseSearchInterface } from '../types/OverGridUseSearchInterface';
const i18n = useI18n();

const props = defineProps<{
  searchConfig: OverGridSearchConfig,
  searcher: OverGridUseSearchInterface
}>();
</script>
