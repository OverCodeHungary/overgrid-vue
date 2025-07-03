<template>
  <ul>
    <li>
      <h3 class="overgrid-toolbar-dropdown-section-title">
        {{ i18n.l('page_size') }}
      </h3>
    </li>
    <li class="overgrid-toolbar-dropdown-section-item" v-for="(possiblePageSize, key) in props.config.possiblePageSizes"
      :key="key">
      <a href="javascript:void(null)" @click="props.paginator.changePageSize(possiblePageSize)"
        class="overgrid-page-size-selector-item"
        :class="[{ 'overgrid-page-size-selector-item-selected': props.paginator.pageSize.value == possiblePageSize }]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd" />
        </svg>
        <span>{{ i18n.l('rows_per_page', {
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

const props = defineProps<{
  config: OverGridPaginationConfig,
  paginator: OverGridUsePaginationInterface
}>();


</script>
