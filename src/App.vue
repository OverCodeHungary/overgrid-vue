<template>
  <OverGrid :config="config" ref="overgrid" />
</template>

<script setup lang="ts">
import OverGrid from './components/OverGrid/OverGrid.vue';
import { onMounted, ref } from 'vue';

const overgrid = ref<InstanceType<typeof OverGrid> | null>(null);

const config = {
  gridUniqueId: 'overgrid-dev',
  endpoint: 'https://robber.hu/overgrid-api/overgrid-demo-api.php',
  rootkey: 'data',
  pagination: {
    active: true,
    initialPage: 0,
    initialSize: 5,
    startWithZero: true,
    allRecordsCountKey: 'totalRecords',
    possiblePageSizes: [1, 2, 5, 10, 20],
  },
  orderConfiguration: {
    active: true,
    orderMultiple: true,
    initialOrderDirection: 'DESC',
    defaultOrder: {
      key: 'id',
      direction: 'DESC'
    }
  },
  refreshable: {
    manualActive: true,
    autoActive: true,
    autoCanBeDisabled: true,
    autoValues: [{
      key: 'every5Seconds',
      refreshInterval: 5000,
      title: 'Every 5 seconds',
      default: false
    }, {
      key: 'every30Seconds',
      refreshInterval: 30000,
      title: 'Every 30 seconds',
      default: true
    }, {
      key: 'every60Seconds',
      refreshInterval: 60000,
      title: 'Every 60 seconds',
      default: true
    }]
  },
  columnSelector: {
    active: true
  },
  currentPageExport: {
    active: true,
    xlsxEnabled: true,
    csvEnabled: true,
  }
}

onMounted(() => {
  overgrid.value?.fields
    .addNumberField('id', 'ID')
    .addTextField('name', 'Name')
    .addNumberField('age', 'Age')
    .addDateField('birthDate', 'Birth Date')
    .addEnumField('gender', 'Gender')
    .addBooleanField('isActive', 'Active')

});

</script>
