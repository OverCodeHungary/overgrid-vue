<template>
  <div class="relative overgrid-dropdown">
    <span class="overgrid-dropdown-btn z-10" @click.stop="toggleOpen">
      <slot name="iconButton"></slot>
    </span>
    <Transition :name="'overgrid-anim-dd-' + props.orientation">
      <div v-show="state.open"
        class="absolute mt-2 z-20 flex items-center justify-start p-2 px-3 rounded-md overgrid-dropdown-panel bg-white shadow-sm"
        :class="[{ 'right-0': props.orientation == 'left' }, { 'left-0': props.orientation == 'right' }, props.extraClass]"
        style="z-index: 1000;">
        <div class="flex flex-col p-1 px-0 w-full">
          <slot name="content"></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';

const props = defineProps({
  orientation: {
    type: String,
    default: 'left'
  },
  extraClass: {
    type: String,
    default: 'w-[250px]'
  }
});

const state = reactive({
  open: false
});

function outsideClickClose(event: MouseEvent) {
  state.open = false;
}

watch(() => state.open, (newValue) => {
  if (newValue) {
    document.addEventListener('click', outsideClickClose);
  }
  else {
    document.removeEventListener('click', outsideClickClose);
  }
});

function toggleOpen() {
  state.open = !state.open;
}

function close() {
  state.open = false;
}

defineExpose<{
  close: () => void;
}>({
  close
});

</script>

<style scoped>
.overgrid-anim-dd-left-enter-active,
.overgrid-anim-dd-left-leave-active {
  transform: scale3d(1, 1, 1);
  transform-origin: top right;
  transition: ease 0.2s;
}

.overgrid-anim-dd-left-enter-from,
.overgrid-anim-dd-left-leave-to {
  transform: scale3d(0, 0, 1);
}

.overgrid-anim-dd-right-enter-active,
.overgrid-anim-dd-right-leave-active {
  transform: scale3d(1, 1, 1);
  transform-origin: top left;
  transition: ease 0.2s;
}

.overgrid-anim-dd-right-enter-from,
.overgrid-anim-dd-right-leave-to {
  transform: scale3d(0, 0, 1);
}
</style>
