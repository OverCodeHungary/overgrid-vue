<template>
  <div class="overgrid-paginator flex flex-row items-center justify-center gap-1 w-full text-center h-12">
    <OverGridBtn variant="primary" size="md" iconOnly rounded
      customClass="overgrid-btn-paginator overgrid-btn-paginator-first-page" @click="props.paginator.firstPage"
      :disabled="!props.paginator.hasPreviousPage()" :title="i18n.l('first_page')">
      <template #iconLeft>
        <OverGridIcon type="chevron-left-double" class="w-3 h-3" />
      </template>
    </OverGridBtn>
    <OverGridBtn variant="primary" size="md" iconOnly rounded
      customClass="overgrid-btn-paginator overgrid-btn-paginator-previous" @click="props.paginator.previousPage"
      :disabled="!props.paginator.hasPreviousPage()" :title="i18n.l('previous')">
      <template #iconLeft>
        <OverGridIcon type="chevron-left" class="w-3 h-3" />
      </template>
    </OverGridBtn>
    <span class="mx-2">
      {{
        i18n.l('page_n_of_m', {
          currentPage: paginator.currentPageForUI?.value.toString() || '0',
          totalPages: paginator.state.totalPages?.toString()
        })
      }}
    </span>
    <OverGridBtn variant="primary" size="md" iconOnly rounded
      customClass="overgrid-btn-paginator overgrid-btn-paginator-next" @click="props.paginator.nextPage"
      :disabled="!props.paginator.hasNextPage()" :title="i18n.l('next')">
      <template #iconLeft>
        <OverGridIcon type="chevron-right" class="w-3 h-3" />
      </template>
    </OverGridBtn>
    <OverGridBtn variant="primary" size="md" iconOnly rounded
      customClass="overgrid-btn-paginator overgrid-btn-paginator-last-page" @click="props.paginator.lastPage"
      :disabled="!props.paginator.hasNextPage()" :title="i18n.l('last')">
      <template #iconLeft>
        <OverGridIcon type="chevron-right-double" class="w-3 h-3" />
      </template>
    </OverGridBtn>
  </div>
</template>

<script lang="ts" setup>
import type { OverGridUsePaginationInterface } from '../types/OverGridUsePaginationInterface';
import useI18n from '../composables/useI18n';
import OverGridBtn from './OverGridBtn.vue';
import OverGridIcon from './OverGridIcon.vue';
const i18n = useI18n();
const props = defineProps<{
  paginator: OverGridUsePaginationInterface
}>();

</script>
