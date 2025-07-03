<template>
  <div class="flex items-center justify-center">
    <div
      :class="getSizeClasses() + ' inline-block animate-spin !rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'"
      role="status">
      <span
        class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  sizeClasses: {
    type: String
  }
})

function getSizeClasses() {
  if (props.sizeClasses) {
    return props.sizeClasses;
  }

  return 'h-8 w-8';
}

</script>
