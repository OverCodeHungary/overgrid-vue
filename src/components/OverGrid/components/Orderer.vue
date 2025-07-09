<template>
  <div class="flex flex-row items-center justify-center">
    <SortIconComponent :direction="props.orderer.getFieldOrderDirection(props.field) || ''" />
  </div>
</template>

<script lang="ts" setup>
import type { OverGridField } from '../types/OverGridField';
import type { OverGridOrderConfig } from '../types/OverGridOrderConfig';
import type { OverGridUseOrderingInterface } from '../types/OverGridUseOrderingInterface';
import SortIconComponent from './SortIconComponent.vue';

const props = defineProps<{
  field: OverGridField;
  config: OverGridOrderConfig;
  orderer: OverGridUseOrderingInterface
}>();

</script>
