<template>
  <button :class="computedClass" :type="props.type" :disabled="props.disabled">
    <slot name="iconLeft" />
    <span v-if="hasText">
      <slot />
    </span>
    <slot name="iconRight" />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  type?: "button" | "submit" | "reset",
  variant?: string, // primary, secondary, danger, etc.
  rounded?: boolean,
  size?: string, // sm, md, lg
  iconOnly?: boolean,
  disabled?: boolean,
  customClass?: string
}>()

const hasText = computed(() => !props.iconOnly)

const base = 'inline-flex items-center justify-center font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'

// Változatok
const variants: Record<string, string> = {
  primary: 'overgrid-btn-primary',
  secondary: 'overgrid-btn-secondary',
  danger: 'overgrid-btn-danger',
  ghost: 'overgrid-btn-ghost',
}

// Méretek
const sizes: Record<string, string> = {
  xs: 'text-sm px-1 py-1',
  sm: 'text-sm px-1.5 py-1.5',
  md: 'text-base px-2.5 py-2.5',
  lg: 'text-lg px-5 py-3',
}

// Lekerekítés
const borderRadius = computed(() =>
  props.rounded
    ? props.iconOnly
      ? 'rounded-full'
      : 'rounded-lg'
    : 'rounded-none'
)

// Végső osztály összefűzése
const computedClass = computed(() => {
  let classList = base;
  if (props.variant && variants[props.variant]) {
    classList += ` ${variants[props.variant]}`;
  }

  if (props.size && sizes[props.size]) {
    classList += ` ${sizes[props.size]}`;
  }

  classList += ' ' + borderRadius.value;

  if (props.iconOnly) {
    classList += ' p-2'; // Icon only buttons should have padding
  } else {
    classList += ' px-4 py-2'; // Default padding for text buttons
  }

  if (props.customClass) {
    classList += ` ${props.customClass}`;
  }

  return classList;
})
</script>
