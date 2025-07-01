<template>
  <div class="overgrid" :grid-unique-id="props.config.gridUniqueId">
    <table>
      <thead class="overgrid-header">
        <tr>
          <th class="overgrid-cell" v-for="titleField in fields.mappingVisible.value" :key="'head_' + titleField.key">
            {{ titleField.title }}
          </th>
        </tr>
      </thead>
      <tbody class="overgrid-body">
        <tr v-for="(record, index) in records.records.value" :key="'record_' + index">
          <td class="overgrid-cell" v-for="bodyField in fields.mappingVisible.value" :key="'body_' + bodyField.key">
            {{ record[bodyField.key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import useFields from './composables/useFields';
import useRecords from './composables/useRecords';
import type { OverGridConfig } from './types/OverGridConfig';

const props = defineProps<{
  config: OverGridConfig;
}>();

const fields = useFields();
const records = useRecords(props.config);

onMounted(() => {
  records.fetchRecords();
})

defineExpose({
  fields,
});

</script>
