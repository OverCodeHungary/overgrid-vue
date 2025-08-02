<template>
  <ul class="overgrid-toolbar-dropdown-section mt-2 px-1">
    <li>
      <h3 class="overgrid-toolbar-dropdown-section-title font-bold">
        {{ i18n.l('auto_refresh_menu_title') }}
      </h3>
    </li>
    <li class="overgrid-toolbar-dropdown-section-item p-3 py-1 hover:bg-black/5 rounded-sm"
      v-if="props.config?.autoCanBeDisabled">
      <a href="javascript:void(null)" @click="props.autoRefresher.changeAutoRefreshValue('disabled')"
        class="overgrid-toolbar-item overgrid-autorefresh-item flex flex-row items-center gap-1 opacity-50"
        :class="[{ 'overgrid-autorefresh-item-selected opacity-100': props.autoRefresher.autoRefresh.value == 'disabled' }]">
        <OverGridIcon type="check" class="w-5 h-5" />
        <span class="text-sm">{{ i18n.l('automatic_list_update_disabled') }}</span>
      </a>
    </li>
    <li class="overgrid-toolbar-dropdown-section-item p-3 py-1 hover:bg-black/5 rounded-sm"
      v-for="(value) in props.config?.autoValues" :key="value.key">
      <a href="javascript:void(null)" @click="props.autoRefresher.changeAutoRefreshValue(value.key)"
        class="overgrid-toolbar-item overgrid-autorefresh-item flex flex-row items-center gap-1 opacity-50"
        :class="[{ 'overgrid-autorefresh-item-selected opacity-100': props.autoRefresher.autoRefresh.value == value.key }]">
        <OverGridIcon type="check" class="w-5 h-5" />
        <span class="text-sm">{{ value.title }}</span>
      </a>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import useI18n from '../../composables/useI18n';
import type { OverGridRefreshableConfig } from '../../types/OverGridRefreshableConfig';
import type { OverGridUseAutoRefreshInterface } from '../../types/OverGridUseAutoRefreshInterface';
const i18n = useI18n();
import OverGridIcon from '../OverGridIcon.vue';

const props = defineProps<{
  config?: OverGridRefreshableConfig,
  autoRefresher: OverGridUseAutoRefreshInterface
}>();


</script>
