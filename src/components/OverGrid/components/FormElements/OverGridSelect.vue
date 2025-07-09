<template>
  <select :class="computedClass" :disabled="props.disabled" v-model="model" v-bind="$attrs">
    <option class="p-0 m-0" v-if="enableNullOption" value="">{{ props.nullOptionText ? props.nullOptionText :
      i18n.l('please_select') }}</option>
    <option class="p-0 m-0" v-for="option in props.options" :key="option.key" :value="option.key">
      {{ option.text }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import useI18n from '../../composables/useI18n';
const i18n = useI18n();
const model = defineModel({ type: String })

const props = defineProps<{
  variant?: string, // primary, secondary, etc.
  rounded?: string,
  size?: string, // sm, md, lg
  disabled?: boolean,
  enableNullOption?: boolean, // If true, the first option will be a null option
  nullOptionText?: string, // Text for the null option
  customClass?: string
  options: Array<{
    key: string, // The key for the option
    text: string // The display value for the option
  }>, // Options for the select dropdown
}>()

const base = 'text-sm'

const variants: Record<string, string> = {
  primary: 'overgrid-input-primary',
  secondary: 'overgrid-input-secondary',
  danger: 'overgrid-input-danger',
  light: 'overgrid-input-light',
}

const sizes: Record<string, string> = {
  sm: 'text-sm px-3 py-1',
  md: 'text-sm px-2 py-2',
  lg: 'text-base px-4 py-2.5',
}

const borderRadius = computed(() =>
  props.rounded ? 'rounded-' + props.rounded : 'rounded-none'
)

const computedClass = computed(() => {
  let classList = base

  if (props.variant && variants[props.variant]) {
    classList += ` ${variants[props.variant]}`
  }

  if (props.size && sizes[props.size]) {
    classList += ` ${sizes[props.size]}`
  }

  classList += ` ${borderRadius.value}`

  if (props.customClass) {
    classList += ` ${props.customClass}`
  }

  return classList
})
</script>
