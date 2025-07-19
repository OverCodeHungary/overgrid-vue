<template>
  <div class="p-4">
    <OverGrid :config="config" ref="overgrid"
      :customFormatters="[{ name: 'CustomFormatter', component: CustomFormatter, }, { name: 'DotEnumFormatter', component: DotEnumFormatter }]">
      <template #extraRow="{ record, extraSlotParams }">
        <div class="overgrid-extra-row-content">
          <p>Extra Row Content for ID: {{ record }}</p>
          <p>More data can be added here...</p>
        </div>
      </template>
    </OverGrid>
  </div>
</template>

<script setup lang="ts">
import OverGrid from './components/OverGrid/OverGrid.vue';
import CustomFormatter from './CustomFormatter.vue';
import DotEnumFormatter from './DotEnumFormatter.vue';
import { onMounted, ref } from 'vue';

const overgrid = ref<InstanceType<typeof OverGrid> | null>(null);

const config = {
  gridUniqueId: 'overgrid-dev',
  endpoint: 'https://robber.hu/overgrid-api/overgrid-demo-api.php',
  rootkey: 'data',
  idkey: 'id',
  locale: 'hu',
  theme: 'default', // or 'pink'
  axiosConfigurator: (axiosInstance: any) => {
    // Example of configuring axios instance
    return axiosInstance;
  },
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
  search: {
    active: true,
    initialQuery: '',
    debounceTime: 500
  },
  rowHighlighter: {
    active: false,
    classList: 'bg-yellow-100',
    fn: (record: any) => {
      // Example condition: highlight rows where age is greater than 30
      return record.age > 20;
    }
  }
}

onMounted(() => {
  overgrid.value?.fields.addActionButtonField('Műveletek', [{
    disabled: false,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" /></svg>',
    variant: 'secondary',
    testValueAttribute: 'edit-button',
    dropdowned: false,
    action: (event: Event, fieldKey: string, data: any, record: any) => {
      console.log('Edit action triggered for:', record);
    }
  }, {
    disabled: false,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" /></svg>',
    variant: 'primary',
    testValueAttribute: 'edit-button',
    dropdowned: false,
    action: (event: Event, fieldKey: string, data: any, record: any) => {
      console.log('Edit action triggered for:', record);
    }
  }, {
    disabled: false,
    title: 'Delete',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" /></svg>',
    classList: 'cursor-pointer bg-[#d92228] hover:bg-green-500 rounded-full w-8 h-8 text-white flex items-center justify-center',
    testValueAttribute: 'edit-button',
    dropdowned: true,
    action: (event: Event, fieldKey: string, data: any, record: any) => {
      console.log('Edit action triggered for:', record);
    }
  }]).commit()
    .addNumberField('id', 'ID').setOrderKey('id2').setFilterKey('id2').commit()
    .addTextField('name', 'Name').setFormatter('ClassFormatter', {
      class: 'font-bold'
    }).setWidth('250px').commit()
    .addNumberField('age', 'Age').setFormatter('NumberFormatter', {
      class: 'font-bold',
      locale: 'hu-HU',
      minimumFractionDigits: 2,
      maximumFractionDigits: 3,
      useGrouping: true,
    }).commit()
    .addDateField('birthDate', 'Birth Date').setFormatter('DateFormatter', {
      inputFormat: 'YYYY-MM-DD',
      outputFormat: 'DD/MM/YYYY'
    }).commit()
    .addEnumField('gender', 'Gender', {
      male: {
        title: 'Férfi',
        class: 'bg-blue-500 text-white p-3 py-1.5 rounded text-xs'
      },
      female: {
        title: 'Nő',
        class: 'bg-pink-500 text-white p-3 py-1.5 rounded text-xs'
      },
    }).commit()
    .addBooleanField('isActive', 'Active').setFormatter('BooleanFormatter', {
      trueText: 'Igen',
      falseText: 'Nem'
    }).commit()
    .addTextField('phoneNumbers', 'Phone Numbers').setMiddleware((data: any) => {
      return data.map((phone: string) => `<span class="text-slate-800">${phone}</span>`).join(', ');
    }).setFormatter('HtmlFormatter', {}).commit()
    .addEnumField('roles', 'Roles', {
      ADMIN: {
        title: 'Admin',
        class: 'bg-blue-500 text-white p-3 py-1.5 rounded text-xs'
      },
      USER: {
        title: 'User',
        class: 'bg-pink-500 text-white p-3 py-1.5 rounded text-xs'
      },
    }).commit()
    .addTextField('introduction', 'Introduction').setMiddleware((data: any) => {
      if (!data) return '';
      return `<p class="text-gray-700 whitespace-nowrap max-w-48 text-ellipsis overflow-hidden">${data}</p>`;
    }).setFormatter('HtmlFormatter', {}).commit()

});

</script>
