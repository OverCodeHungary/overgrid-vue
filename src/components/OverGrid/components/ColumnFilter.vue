<template>
  <button v-if="!columnFilter.isFieldActive(props.field)" @click.stop="columnFilter.initiateColumnFilter(props.field)"
    class="overgrid-btn overgrid-column-filter-btn">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round"
        d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
    </svg>
  </button>
  <Dropdown extraClass="w-[200px]" v-else :orientation="((clientWidth < 640) ? 'right' : 'left')"
    ref="columnFilterDropdown" class="overgrid-column-filter-dropdown">
    <template #iconButton>
      <button class="rounded-full overgrid-btn overgrid-column-filter-btn overgrid-column-filter-btn-active">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
        </svg>
      </button>
    </template>
    <template #content>
      <ul class="overgrid-column-filter-dropdown-section flex flex-col gap-2 text-left">
        <li class="overgrid-column-filter-dropdown-section-item">
          <a @click.stop.prevent="props.columnFilter.editColumnFilter(props.field)" href="javascript:void(null)"
            class="font-normal text-left flex flex-row items-center" @click="">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            <span>{{ i18n.l('column_filters_edit_filter') }}</span>
          </a>
        </li>
        <li class="overgrid-column-filter-dropdown-section-item">
          <a @click.stop.prevent="props.columnFilter.removeColumnFilter(props.field)" href="javascript:void(null)"
            class="font-normal text-left flex flex-row items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span>{{ i18n.l('column_filters_remove_filter') }}</span>
          </a>
        </li>
      </ul>
    </template>
  </Dropdown>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { OverGridColumnFiltersConfig } from '../types/OverGridColumnFIltersConfig';
import type { OverGridField } from '../types/OverGridField';
import type { OverGridUseColumnFiltersInterface } from '../types/OverGridUseColumnFiltersInterface';
import Dropdown from './Dropdown.vue';
import useI18n from '../composables/useI18n';
const i18n = useI18n();

const clientWidth = ref(document.documentElement.clientWidth)

const props = defineProps<{
  field: OverGridField;
  config: OverGridColumnFiltersConfig;
  columnFilter: OverGridUseColumnFiltersInterface
}>();

</script>
