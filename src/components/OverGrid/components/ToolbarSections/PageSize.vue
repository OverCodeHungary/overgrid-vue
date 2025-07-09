<template>
  <ul class="overgrid-toolbar-dropdown-section">
    <li>
      <h3 class="overgrid-toolbar-dropdown-section-title font-bold mt-2">
        {{ i18n.l('page_size') }}
      </h3>
    </li>
    <li class="overgrid-toolbar-dropdown-section-item p-3 py-1 hover:bg-black/5 rounded-sm"
      v-for="(possiblePageSize, key) in props.config.possiblePageSizes" :key="key">
      <a href="javascript:void(null)" @click="props.paginator.changePageSize(possiblePageSize)"
        class="overgrid-page-size-selector-item flex flex-row items-center gap-1 opacity-50"
        :class="[{ 'overgrid-page-size-selector-item-selected opacity-100': props.paginator.pageSize.value == possiblePageSize }]">
        <OverGridIcon type="check" class="w-5 h-5" />
        <span class="text-sm">{{ i18n.l('rows_per_page', {
          possiblePageSize: possiblePageSize.toString(),
        }) }}</span>
      </a>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import useI18n from '../../composables/useI18n';
import type { OverGridPaginationConfig } from '../../types/OverGridPaginationConfig';
import type { OverGridUsePaginationInterface } from '../../types/OverGridUsePaginationInterface';
const i18n = useI18n();
import OverGridIcon from '../OverGridIcon.vue';

const props = defineProps<{
  config: OverGridPaginationConfig,
  paginator: OverGridUsePaginationInterface
}>();


</script>
