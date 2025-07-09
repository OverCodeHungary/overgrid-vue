<template>
  <ul v-if="needsToShow" class="overgrid-toolbar-dropdown-section">
    <li>
      <h3 class="overgrid-toolbar-dropdown-section-title font-bold">
        {{ i18n.l('base_operations') }}
      </h3>
    </li>
    <li class="overgrid-toolbar-dropdown-section-item hover:bg-black/5 rounded-sm"
      v-if="props.config?.columnSelector?.active">
      <a href="javascript:void(null)" @click="() => { props.columnSelector.showModal(); props.closeDropdown?.() }"
        class="overgrid-base-operator-item p-3 py-1 flex flex-row items-center gap-1">
        <OverGridIcon type="table" class="w-5 h-5 opacity-50" />
        <span class="text-sm">{{ i18n.l('column_selector') }}</span>
      </a>
    </li>
    <li class="overgrid-toolbar-dropdown-section-item hover:bg-black/5 rounded-sm"
      v-if="props.config?.currentPageExport?.active && (props.config.currentPageExport?.xlsxEnabled || props.config.currentPageExport?.csvEnabled)">
      <a href="javascript:void(null)" @click="() => { props.currentPageExporter.showModal(); props.closeDropdown?.() }"
        class="overgrid-base-operator-item p-3 py-1 flex flex-row items-center gap-1">
        <OverGridIcon type="cloud-download" class="w-5 h-5 opacity-50" />
        <span class="text-sm">{{ i18n.l('current_page_export') }}</span>
      </a>
    </li>
    <li class="overgrid-toolbar-dropdown-section-item hover:bg-black/5 rounded-sm"
      v-if="!props.config?.hideAboutWindow">
      <a href="javascript:void(null)" @click="() => { props.aboutModal.showModal(); props.closeDropdown?.() }"
        class="overgrid-base-operator-item p-3 py-1 flex flex-row items-center gap-1">
        <OverGridIcon type="info" class="w-5 h-5 opacity-50" />
        <span class="text-sm">{{ i18n.l('about') }}</span>
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
import OverGridIcon from '../OverGridIcon.vue';
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
  closeDropdown?: () => void
}>();


</script>
