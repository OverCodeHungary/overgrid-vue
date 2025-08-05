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
  locale: {
    current_page_export: 'Aktuelle Seite exportieren',
    ok: 'OK',
    cancel: 'Abbrechen',
    column_selector: 'Spaltenauswahl',
    rows_per_page: '{possiblePageSize} Zeilen pro Seite',
    export_format: 'Format',
    export_fields: 'Felder',
    export_records: 'Aktuelle Seite exportieren',
    about: 'Über OverGrid',
    column_filter_text_modal_title: 'Filter hinzufügen',
    contains: 'enthält',
    not_contains: 'enthält nicht',
    equals: 'ist gleich',
    not_equals: 'ist nicht gleich',
    starts_with: 'beginnt mit',
    not_starts_with: 'beginnt nicht mit',
    ends_with: 'endet mit',
    not_ends_with: 'endet nicht mit',
    operation: 'Operation',
    value: 'Wert',
    please_enter_value: 'Bitte Wert eingeben',
    column_filters_edit_filter: 'Filter bearbeiten',
    column_filters_remove_filter: 'Filter entfernen',
    less_than: 'kleiner als',
    less_than_equals: 'kleiner oder gleich',
    greater_than: 'größer als',
    greater_than_equals: 'größer oder gleich',
    on_this_day: 'an diesem Tag',
    in_this_interval: 'in diesem Zeitraum',
    on_or_before_this_day: 'an oder vor diesem Tag',
    before_this_day: 'vor diesem Tag',
    on_or_after_this_day: 'an oder nach diesem Tag',
    after_this_day: 'nach diesem Tag',
    interval_start: 'Beginn des Zeitraums',
    interval_end: 'Ende des Zeitraums',
    check_if_you_want_to_filter_yes:
      'Ankreuzen für "Ja" filtern, leer lassen für "Nein" filtern',
    search: 'Suche',
    bulk_method: 'Massenoperation',
    first: 'Erste',
    previous: 'Zurück',
    next: 'Weiter',
    last: 'Letzte',
    page_n_of_m: 'Seite {currentPage} von {totalPages}',
    base_operations: 'Grundoperationen',
    auto_refresh_menu_title: 'Automatische Aktualisierung',
    automatic_list_update_disabled: 'Deaktiviert',
    page_size: 'Seitengröße',
    selected_rows: '{selectedCount} ausgewählt',
    loading_data: 'Daten werden geladen...',
    actions: 'Aktionen',
    yes: 'Ja',
    no: 'Nein',
    column_filter_enum_modal_title: 'Filter hinzufügen',
    column_filter_number_modal_title: 'Filter hinzufügen',
    column_filter_date_modal_title: 'Filter hinzufügen',
    column_filter_boolean_modal_title: 'Filter hinzufügen',
    close: 'Schließen'
  },
  theme: 'default', // or 'pink'
  hideAboutWindow: false,
  // axiosConfigurator: (axiosInstance: any) => {
  //   // Example of configuring axios instance
  //   return axiosInstance;
  // },
  // orderConfiguration: {
  //   active: true,
  //   orderMultiple: true,
  //   initialOrderDirection: 'DESC',
  //   defaultOrder: {
  //     key: 'id',
  //     orderKey: 'id2', // This is the key used for ordering, can be different from the field key
  //     direction: 'DESC'
  //   }
  // },
  // refreshable: {
  //   manualActive: true,
  //   autoActive: true,
  //   autoCanBeDisabled: true,
  //   autoValues: [{
  //     key: 'every5Seconds',
  //     refreshInterval: 5000,
  //     title: 'Every 5 seconds',
  //     default: false
  //   }, {
  //     key: 'every30Seconds',
  //     refreshInterval: 30000,
  //     title: 'Every 30 seconds',
  //     default: true
  //   }, {
  //     key: 'every60Seconds',
  //     refreshInterval: 60000,
  //     title: 'Every 60 seconds',
  //     default: true
  //   }]
  // },
  // columnSelector: {
  //   active: true
  // },
  // events: {
  //   onBulkSelectChanges: (selectedRows: any[]) => {
  //     console.log('Selected rows:', selectedRows);
  //   }
  // },
  // currentPageExport: {
  //   active: true,
  //   xlsxEnabled: true,
  //   csvEnabled: true,
  // },
  // bulkOperations: {
  //   active: true,
  //   methods: [{
  //     title: 'Alert me',
  //     key: 'alertMe',
  //     action: (checkedRows: any[], clearRows: () => void) => {
  //       alert(`You have selected ${checkedRows.length} rows.`);
  //       clearRows();
  //     }
  //   }]
  // },
  // extraRow: {
  //   active: true,
  //   multiOpen: true,
  //   extraSlotParams: {
  //     test: 'This is a test value',
  //   }
  // },
  // columnFilters: {
  //   active: true
  // },
  // search: {
  //   active: true,
  //   initialQuery: '',
  //   debounceTime: 500
  // },
  // rowHighlighter: {
  //   active: true,
  //   classList: 'bg-yellow-100',
  //   fn: (record: any) => {
  //     // Example condition: highlight rows where age is greater than 30
  //     return record.age > 20;
  //   }
  // }
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
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" /></svg>',
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
      return data.map((phone: string) => `<span class="text-slate-800 dark:text-slate-200">${phone}</span>`).join(', ');
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
      return `<p class="text-gray-700 dark:text-gray-200 whitespace-nowrap max-w-48 text-ellipsis overflow-hidden">${data}</p>`;
    }).setFormatter('HtmlFormatter', {}).commit()

});

</script>
