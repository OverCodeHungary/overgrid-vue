<template>
  <input :class="computedClass" :type="props.type" :disabled="props.disabled" v-model="model" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const model = defineModel({ type: String })

const props = defineProps<{
  type?: string, // text, email, password, etc.
  variant?: string, // primary, secondary, etc.
  rounded?: string,
  size?: string, // sm, md, lg
  disabled?: boolean,
  customClass?: string
}>()

const base = ''

const variants: Record<string, string> = {
  primary: 'overgrid-input-primary',
  secondary: 'overgrid-input-secondary',
  danger: 'overgrid-input-danger',
  light: 'overgrid-input-light',
}

const sizes: Record<string, string> = {
  sm: 'text-sm px-3 py-1',
  md: 'text-sm px-3 py-2',
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
