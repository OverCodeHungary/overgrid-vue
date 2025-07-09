<template>
  <label class="inline-flex items-center cursor-pointer select-none">
    <input type="checkbox" :value="props.value" :checked="isChecked" :disabled="props.disabled"
      @change="toggleSelection" class="sr-only peer" />

    <div class="w-5 h-5 rounded-md border overgrid-checkbox
             flex items-center justify-center transition-colors duration-200
             peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"
      :class="props.variant ? `overgrid-checkbox-${props.variant}` : 'overgrid-checkbox-primary'">
      <transition name="checkmark" enter-active-class="transition duration-200 ease-out"
        leave-active-class="transition duration-150 ease-in" enter-from-class="opacity-0 scale-75"
        enter-to-class="opacity-100 scale-100" leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-75">
        <svg v-show="isChecked" class="w-3 h-3 text-white" fill="none" stroke="currentColor" stroke-width="3"
          viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </transition>
    </div>
  </label>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'
const emit = defineEmits(['update:modelValue'])

const props = defineProps<{
  modelValue: Array<string | number>,
  value: string | number,
  disabled?: boolean,
  customClass?: string
  variant?: string
}>();

const isChecked = computed(() => {
  return props.modelValue?.includes(props.value)
})

function toggleSelection(event: any) {
  const newValue = props.modelValue ? [...props.modelValue] : [];
  if (event.target?.checked) {
    newValue.push(props.value);
  } else {
    const index = newValue.indexOf(props.value);
    if (index > -1) newValue.splice(index, 1);
  }
  emit('update:modelValue', newValue);
}

</script>
