<template>
  <div v-if="props.orderer.isFieldActive(props.field)">
    <button data-test="asc-button" @click="props.orderer.toggleField(props.field)"
      v-if="props.orderer.getFieldOrderDirection(props.field) == 'DESC'"
      class="overgrid-btn overgrid-order-btn overgrid-order-btn-inactive">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
      </svg>
    </button>
    <button data-test="desc-button" @click="props.orderer.toggleField(props.field)"
      v-if="props.orderer.getFieldOrderDirection(props.field) == 'ASC'"
      class="overgrid-btn overgrid-order-btn overgrid-order-btn-inactive">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
      </svg>
    </button>
  </div>
</template>

<script lang="ts" setup>
import type { OverGridField } from '../types/OverGridField';
import type { OverGridOrderConfig } from '../types/OverGridOrderConfig';
import type { OverGridUseOrderingInterface } from '../types/OverGridUseOrderingInterface';

const props = defineProps<{
  field: OverGridField;
  config: OverGridOrderConfig;
  orderer: OverGridUseOrderingInterface
}>();

</script>
