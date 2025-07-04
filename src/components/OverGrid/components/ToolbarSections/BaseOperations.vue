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
    <li class="overgrid-toolbar-dropdown-section-item"
      v-if="props.config?.currentPageExport?.active && (props.config.currentPageExport?.xlsxEnabled || props.config.currentPageExport?.csvEnabled)">
      <a href="javascript:void(null)" @click="props.currentPageExporter.showModal" class="overgrid-base-operator-item">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
        </svg>
        <span class="">{{ i18n.l('current_page_export') }}</span>
      </a>
    </li>
    <li class="overgrid-toolbar-dropdown-section-item" v-if="!props.config?.hideAboutWindow">
      <a href="javascript:void(null)" @click="props.aboutModal.showModal" class="overgrid-base-operator-item">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
        </svg>
        <span class="">{{ i18n.l('about') }}</span>
      </a>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import useI18n from '../../composables/useI18n';
import type { OverGridConfig } from '../../types/OverGridConfig';
import type { OverGridUseColumnSelectorInterface } from '../../types/OverGridUseColumnSelectorInterface';
import type { OverGridUseCurrentPageExportInterface } from '../../types/OverGridUseCurrentPageExportInterface';
import type { OverGridUseAboutModalInterface } from '../../types/OverGridUseAboutModalInterface';
const i18n = useI18n();

const needsToShow = computed(() => {
  return props.config?.columnSelector?.active ||
    (props.config?.currentPageExport?.active && (props.config.currentPageExport?.xlsxEnabled || props.config.currentPageExport?.csvEnabled)) ||
    !props.config?.hideAboutWindow
})

const props = defineProps<{
  config: OverGridConfig,
  columnSelector: OverGridUseColumnSelectorInterface,
  currentPageExporter: OverGridUseCurrentPageExportInterface,
  aboutModal: OverGridUseAboutModalInterface
}>();


</script>
