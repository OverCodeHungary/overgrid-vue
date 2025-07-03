<template>
  <ul v-if="needsToShow">
    <li>
      <h3 class="overgrid-toolbar-dropdown-section-title">
        {{ i18n.l('base_operations') }}
      </h3>
    </li>
    <li class="overgrid-toolbar-dropdown-section-item" v-if="props.config?.columnSelector?.active">
      <a href="javascript:void(null)" @click="props.columnSelector.showModal" class="overgrid-base-operator-item">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z" />
        </svg>
        <span class="">{{ i18n.l('column_selector') }}</span>
      </a>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import useI18n from '../../composables/useI18n';
import type { OverGridConfig } from '../../types/OverGridConfig';
import type { OverGridUseColumnSelectorInterface } from '../../types/OverGridUseColumnSelectorInterface';
const i18n = useI18n();

const needsToShow = computed(() => {
  return props.config?.columnSelector?.active
})

const props = defineProps<{
  config: OverGridConfig,
  columnSelector: OverGridUseColumnSelectorInterface
}>();


</script>
