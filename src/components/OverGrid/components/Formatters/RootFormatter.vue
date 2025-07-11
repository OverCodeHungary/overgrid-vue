<template>
  <template v-for="formatter in formatters">
    <component v-if="type === formatter.name" :l="i18n.l" :is="formatter.component" :data="props.data"
      :formatterConfig="formatterConfig" :rowid="rowid" :fieldKey="fieldKey" :record="record" :refreshGrid="refreshGrid"
      :openExtraRow="openExtraRow" />
  </template>
</template>

<script setup lang="ts">
import useI18n from '../../composables/useI18n';
import EnumFormatter from './EnumFormatter.vue';
import BooleanFormatter from './BooleanFormatter.vue';
import ClassFormatter from './ClassFormatter.vue';
import DateFormatter from './DateFormatter.vue';
import NumberFormatter from './NumberFormatter.vue';
import ActionButtonsFormatter from './ActionButtonsFormatter.vue';
import HtmlFormatter from './HtmlFormatter.vue';
const i18n = useI18n();

const props = defineProps<{
  theme: string,
  type: string,
  data: any,
  rowid: string | number,
  formatterConfig: {
    type: string,
    config?: any
  }
  fieldKey: string,
  record: any,
  refreshGrid: Function,
  openExtraRow: Function,
  customFormatters?: {
    name: string;
    component: any;
  }[];
}>();

const formatters = [{
  name: 'EnumFormatter',
  component: EnumFormatter
}, {
  name: 'BooleanFormatter',
  component: BooleanFormatter
}, {
  name: 'ClassFormatter',
  component: ClassFormatter
}, {
  name: 'DateFormatter',
  component: DateFormatter
}, {
  name: 'NumberFormatter',
  component: NumberFormatter
}, {
  name: 'ActionButtonsFormatter',
  component: ActionButtonsFormatter
}, {
  name: 'HtmlFormatter',
  component: HtmlFormatter
}].concat(props.customFormatters || []);

</script>
