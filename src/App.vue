<template>
  <OverGrid :config="{
    gridUniqueId: 'overgrid-dev',
    endpoint: 'https://robber.hu/overgrid-api/overgrid-demo-api.php',
    rootkey: 'data',
    pagination: {
      active: true,
      initialPage: 0,
      initialSize: 10,
      allRecordsCountKey: 'totalRecords'
    },
  }" ref="overgrid" />
</template>

<script setup lang="ts">
import OverGrid from './components/OverGrid/OverGrid.vue';
import { onMounted, ref } from 'vue';

const overgrid = ref<InstanceType<typeof OverGrid> | null>(null);

onMounted(() => {
  overgrid.value?.fields.addNumberField('id', 'ID');
});

</script>
