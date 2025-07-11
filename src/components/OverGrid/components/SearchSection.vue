<template>
  <div class="flex flex-row gap-1 items-center relative overgrid-search-container">
    <OverGridInputText rounded="full" size="sm" variant="primary" type="text" v-model="props.searcher.query.value"
      :placeholder="props.searchConfig?.inputPlaceholder ? props.searchConfig.inputPlaceholder : i18n.l('search')"
      customClass="overgrid-input overgrid-input-search w-32 sm:w-60" />
    <OverGridBtn iconOnly rounded size="sm" variant="ghost" v-if="props.searcher.query.value"
      @click="() => { props.searcher.query.value = '' }"
      customClass="overgrid-btn-search-clear w-7 h-7 absolute right-0">
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
import OverGridInputText from './FormElements/OverGridInputText.vue';
import OverGridBtn from './OverGridBtn.vue';
import OverGridIcon from './OverGridIcon.vue';
const i18n = useI18n();

const props = defineProps<{
  searchConfig: OverGridSearchConfig,
  searcher: OverGridUseSearchInterface
}>();
</script>
