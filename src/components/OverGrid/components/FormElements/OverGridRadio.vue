<template>
  <label class="inline-flex items-center cursor-pointer select-none">
    <input type="radio" :value="props.value" v-model="model" :disabled="props.disabled" class="sr-only peer" />

    <div class="w-5 h-5 rounded-md border overgrid-radio
             flex items-center justify-center transition-colors duration-200
             peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"
      :class="props.variant ? `overgrid-radio-${props.variant}` : 'overgrid-radio-primary'">
      <transition name="checkmark" enter-active-class="transition duration-200 ease-out"
        leave-active-class="transition duration-150 ease-in" enter-from-class="opacity-0 scale-75"
        enter-to-class="opacity-100 scale-100" leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-75">
        <svg v-show="model == props.value" class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="8" />
        </svg>
      </transition>
    </div>
  </label>
</template>

<script setup lang="ts">
const model = defineModel({ type: String })

const props = defineProps<{
  value: string | number,
  disabled?: boolean,
  customClass?: string
  variant?: string
}>();


</script>
