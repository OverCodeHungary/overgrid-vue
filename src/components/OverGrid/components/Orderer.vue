<template>
  <div v-if="props.orderer.isFieldActive(props.field)">
    <button data-test="asc-button" @click="props.orderer.toggleOrderDirection(props.field)"
      v-if="props.orderer.getFieldOrderDirection(props.field) == 'DESC'"
      class="overgrid-btn overgrid-order-btn overgrid-order-btn-inactive">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
      </svg>
    </button>
    <button data-test="desc-button" @click="props.orderer.toggleOrderDirection(props.field)"
      v-if="props.orderer.getFieldOrderDirection(props.field) == 'ASC'"
      class="overgrid-btn overgrid-order-btn overgrid-order-btn-inactive">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
      </svg>
    </button>
    <button data-test="remove-button" @click="props.orderer.removeOrder(props.field)"
      class="overgrid-btn overgrid-order-btn overgrid-order-btn-inactive">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    </button>
  </div>
  <button data-test="add-button" @click="props.orderer.addOrder(props.field)"
    class="overgrid-btn overgrid-order-btn overgrid-order-btn-inactive" v-else>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
      class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
    </svg>
  </button>
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
