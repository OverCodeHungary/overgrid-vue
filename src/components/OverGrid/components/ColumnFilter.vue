<template>
  <OverGridBtn v-if="!columnFilter.isFieldActive(props.field)"
    @click.stop.prevent="columnFilter.initiateColumnFilter(props.field)" iconOnly rounded variant="secondary" size="sm"
    customClass="overgrid-btn-column-filter">
    <template #iconLeft>
      <OverGridIcon type="filter" class="w-3 h-3" />
    </template>
  </OverGridBtn>
  <Dropdown extraClass="w-[230px]" v-else :orientation="((clientWidth < 640) ? 'right' : 'left')"
    ref="columnFilterDropdown" class="overgrid-column-filter-dropdown">
    <template #iconButton>
      <OverGridBtn iconOnly rounded variant="danger" size="sm"
        customClass="overgrid-btn-column-filter overgrid-btn-column-filter-active">
        <template #iconLeft>
          <OverGridIcon type="filter" class="w-3 h-3" />
        </template>
      </OverGridBtn>
    </template>
    <template #content>
      <ul class="overgrid-column-filter-dropdown-section flex flex-col gap-2 text-left">
        <li class="overgrid-column-filter-dropdown-section-item hover:bg-black/5 rounded-sm">
          <a @click.stop.prevent="() => { props.columnFilter.editColumnFilter(props.field); columnFilterDropdown?.close() }"
            href="javascript:void(null)" class="font-normal text-left flex flex-row items-center p-3 py-1.5 gap-1"
            @click="">
            <OverGridIcon type="edit" class="w-5 h-5 opacity-50" />
            <span>{{ i18n.l('column_filters_edit_filter') }}</span>
          </a>
        </li>
        <li class="overgrid-column-filter-dropdown-section-item hover:bg-black/5 rounded-sm">
          <a @click.stop.prevent="() => { props.columnFilter.removeColumnFilter(props.field); columnFilterDropdown?.close() }"
            href="javascript:void(null)" class="font-normal text-left flex flex-row items-center p-3 py-1.5 gap-1">
            <OverGridIcon type="trash" class="w-5 h-5 opacity-50" />
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
import OverGridIcon from './OverGridIcon.vue';
import type { OverGridUseColumnFiltersInterface } from '../types/OverGridUseColumnFiltersInterface';
import Dropdown from './Dropdown.vue';
import useI18n from '../composables/useI18n';
import OverGridBtn from './OverGridBtn.vue';
const i18n = useI18n();

const columnFilterDropdown = ref<InstanceType<typeof Dropdown> | null>(null);
const clientWidth = ref(document.documentElement.clientWidth)

const props = defineProps<{
  field: OverGridField;
  config: OverGridColumnFiltersConfig;
  columnFilter: OverGridUseColumnFiltersInterface
}>();

</script>
