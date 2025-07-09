<template>
  <Transition name="overgrid-anim-modal-fade">
    <div class="fixed w-full h-full top-0 left-0 z-30 overgrid-modal" v-show="state.show">
      <div class="absolute w-full h-full bg-slate-900/60 overgrid-modal-backdrop"></div>
      <Transition name="overgrid-anim-modal">
        <div class="flex align-items-center justify-center w-full py-8">
          <div
            class="relative flex w-full max-w-2xl origin-top flex-col overflow-hidden rounded-lg overgrid-modal-inner bg-white shadow-sm">
            <div
              class="flex justify-between items-center rounded-t-lg  dark:bg-navy-800 overgrid-modal-title-bar p-4 px-5">
              <h3 class="text-base font-medium overgrid-modal-title">
                {{ title }}
              </h3>
              <OverGridBtn class="overgrid-btn-modal-close" variant="ghost" size="md" iconOnly rounded
                @click="props.close">
                <template #iconLeft>
                  <OverGridIcon type="close" class="w-4 h-4" />
                </template>
              </OverGridBtn>
            </div>

            <div class="overgrid-modal-content scrollbar-sm overflow-y-auto px-5"
              :class="[{ '!overflow-y-visible': overflowVisible }]">
              <slot name="content"></slot>
            </div>

            <div v-if="disableButtons !== true"
              class="flex justify-end items-center gap-2 rounded-t-lgdark:bg-navy-800 overgrid-modal-buttons-bar p-4 px-5">
              <OverGridBtn class="overgrid-btn-modal-cancel" variant="ghost" size="sm" rounded @click="props.close">
                {{ cancelButtonTitle ? cancelButtonTitle : i18n.l('cancel') }}
              </OverGridBtn>
              <OverGridBtn class="overgrid-btn-modal-ok" variant="primary" size="sm" rounded v-if="!noNeedOkButton"
                :disabled="okButtonLoading || disableOkButton" @click="() => { if (props.ok) { props.ok() } }">
                <span v-if="!okButtonLoading">{{ okButtonTitle ? okButtonTitle : i18n.l('ok') }}</span>
                <SpinnerLoader v-else sizeClasses="h-5.5 w-5.5" />
              </OverGridBtn>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { watch, reactive } from 'vue';
import SpinnerLoader from './SpinnerLoader.vue';
import useI18n from '../composables/useI18n';
import OverGridBtn from './OverGridBtn.vue';
import OverGridIcon from './OverGridIcon.vue';
const i18n = useI18n();

const props = defineProps({
  show: {
    required: true
  },
  title: {
    type: String,
    required: true
  },
  cancelButtonTitle: {
    type: String
  },
  okButtonTitle: {
    type: String
  },
  close: {
    type: Function,
    required: true
  },
  ok: {
    type: Function,
    required: false
  },
  disableButtons: {
    type: Boolean,
    default: false,
    required: false
  },
  disableOkButton: {
    type: Boolean,
    default: false,
    required: false
  },
  okButtonLoading: {
    type: Boolean,
    default: false,
    required: false
  },
  noNeedOkButton: {
    type: Boolean,
    default: false,
    required: false
  },
  maxWidthClass: {
    type: String,
    default: 'max-w-2xl',
    required: false
  },
  overflowVisible: {
    type: Boolean,
    default: false,
    required: false
  }
});

const state = reactive({
  show: props.show
});

watch(() => props.show, (newVal) => {
  state.show = newVal;
});

</script>

<style scoped>
.overgrid-anim-modal-enter-active,
.overgrid-anim-modal-leave-active {
  transform: scale3d(1, 1, 1);
  transform-origin: center center;
  transition: ease 0.2s;
}

.overgrid-anim-modal-enter-from,
.overgrid-anim-modal-leave-to {
  transform: scale3d(0, 0, 1);
}

.overgrid-anim-modal-fade-enter-active,
.overgrid-anim-modal-fade-leave-active {
  transition: ease 0.2s;
}

.overgrid-anim-modal-fade-enter-from,
.overgrid-anim-modal-fade-leave-to {
  opacity: 0;
}
</style>
