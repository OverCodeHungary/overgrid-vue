<template>
  <OverGrid :config="config" ref="overgrid">
    <template #extraRow="{ record, extraSlotParams }">
      <div class="overgrid-extra-row-content">
        <p>Extra Row Content for ID: {{ record }}</p>
        <p>More data can be added here...</p>
      </div>
    </template>
  </OverGrid>
</template>

<script setup lang="ts">
import OverGrid from './components/OverGrid/OverGrid.vue';
import { onMounted, ref } from 'vue';

const overgrid = ref<InstanceType<typeof OverGrid> | null>(null);

const config = {
  gridUniqueId: 'overgrid-dev',
  endpoint: 'https://robber.hu/overgrid-api/overgrid-demo-api.php',
  rootkey: 'data',
  idkey: 'id',
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
      orderKey: 'id2', // This is the key used for ordering, can be different from the field key
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
  },
  bulkOperations: {
    active: true,
    methods: [{
      title: 'Alert me',
      key: 'alertMe',
      action: (checkedRows: any[], clearRows: () => void) => {
        alert(`You have selected ${checkedRows.length} rows.`);
        clearRows();
      }
    }]
  },
  extraRow: {
    active: true,
    multiOpen: true,
    extraSlotParams: {
      test: 'This is a test value',
    }
  },
  columnFilters: {
    active: true
  },
}

onMounted(() => {
  overgrid.value?.fields
    .addNumberField('id', 'ID').setOrderKey('id2').setFilterKey('id2').commit()
    .addTextField('name', 'Name').commit()
    .addNumberField('age', 'Age').commit()
    .addDateField('birthDate', 'Birth Date').commit()
    .addEnumField('gender', 'Gender', {
      male: {
        title: 'Férfi',
        class: 'text-blue-500'
      },
      female: {
        title: 'Nő',
        class: 'text-pink-500'
      },
    }).commit()
    .addBooleanField('isActive', 'Active').commit();

});

</script>
