<template>
  <div class="flex flex-row gap-1 overgrid-search-container">
    <input type="text" class="overgrid-input overgrid-input-search" v-model="props.searcher.query.value"
      :placeholder="props.searchConfig?.inputPlaceholder ? props.searchConfig.inputPlaceholder : i18n.l('search')" />
    <OverGridBtn iconOnly rounded size="sm" variant="danger" v-if="props.searcher.query.value"
      @click="() => { props.searcher.query.value = '' }" customClass="overgrid-btn-search-clear">
      <template #iconLeft>
        <OverGridIcon type="close" class="w-3 h-3" />
      </template>
    </OverGridBtn>
  </div>
</template>

<script setup lang="ts">
import useI18n from '../composables/useI18n';
import type { OverGridSearchConfig } from '../types/OverGridSearchConfig';
import type { OverGridUseSearchInterface } from '../types/OverGridUseSearchInterface';
import OverGridBtn from './OverGridBtn.vue';
import OverGridIcon from './OverGridIcon.vue';
const i18n = useI18n();

const props = defineProps<{
  searchConfig: OverGridSearchConfig,
  searcher: OverGridUseSearchInterface
}>();
</script>
