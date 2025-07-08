<template>
  <ul class="overgrid-toolbar-dropdown-section">
    <li>
      <h3 class="overgrid-toolbar-dropdown-section-title">
        {{ i18n.l('auto_refresh_menu_title') }}
      </h3>
    </li>
    <li class="overgrid-toolbar-dropdown-section-item" v-if="props.config?.autoCanBeDisabled">
      <a href="javascript:void(null)" @click="props.autoRefresher.changeAutoRefreshValue('disabled')"
        class="overgrid-autorefresh-item"
        :class="[{ 'overgrid-autorefresh-item-selected': props.autoRefresher.autoRefresh.value == 'disabled' }]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd" />
        </svg>
        <span class="">{{ i18n.l('automatic_list_update_disabled') }}</span>
      </a>
    </li>
    <li class="overgrid-toolbar-dropdown-section-item" v-for="(value) in props.config?.autoValues" :key="value.key">
      <a href="javascript:void(null)" @click="props.autoRefresher.changeAutoRefreshValue(value.key)"
        class="overgrid-autorefresh-item"
        :class="[{ 'overgrid-autorefresh-item-selected': props.autoRefresher.autoRefresh.value == value.key }]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd" />
        </svg>
        <span class="">{{ value.title }}</span>
      </a>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import useI18n from '../../composables/useI18n';
import type { OverGridRefreshableConfig } from '../../types/OverGridRefreshableConfig';
import type { OverGridUseAutoRefreshInterface } from '../../types/OverGridUseAutoRefreshInterface';
const i18n = useI18n();
import { ref } from 'vue';

const props = defineProps<{
  config: OverGridRefreshableConfig,
  autoRefresher: OverGridUseAutoRefreshInterface
}>();


</script>
