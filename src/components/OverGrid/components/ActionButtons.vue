<template>
  {{ props.actionButtoner.mapping.value.length }}
</template>

<script lang="ts" setup>
import OverGridActionButtons from '../types/OverGridActionButtons';

const props = defineProps<{
  record: Record<string, any>;
  actionButtoner: OverGridActionButtons;
}>();

</script>
