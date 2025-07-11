<template>
  <div data-test="" class="flex flex-row overflow-y-visible" @mousedown.stop>
    <span v-if="rowButtonsNormal.length > 0" class="flex flex-row items-center gap-1.5 pr-1">
      <OverGridBtn rounded iconOnly :variant="button.variant"
        @click="(event: Event) => { button.action(event, fieldKey, data, record) }"
        :disabled="button.disabled ? button.disabled : false" data-test="overgrid-action-button"
        :data-test-value="button.testValueAttribute" v-for="(button, index) in rowButtonsNormal" :key="index"
        :customClass="button.classList">
        <template #iconLeft v-if="button.icon">
          <span v-html="button.icon"></span>
        </template>
      </OverGridBtn>
    </span>
    <span v-if="rowButtonsDropdowned.length > 0" class="flex items-center ml-1.5">
      <Dropdown
        :orientation="props.formatterConfig?.config?.dropdownOrientation ? props.formatterConfig?.config?.dropdownOrientation : 'right'">
        <template #iconButton>
          <OverGridBtn rounded iconOnly variant="ghost" data-test="overgrid-action-button-dropdown">
            <template #iconLeft>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 min-w-4 w-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </template>
          </OverGridBtn>
        </template>
        <template #content>
          <div class="!rounded-md font-inter w-full">
            <ul class="my-1 rounded-lg">
              <li class=" hover:bg-black/5" v-for="(button, key) in rowButtonsDropdowned" :key="key">
                <a href="javascript:void(null);" :disabled="button.disabled ? button.disabled : false"
                  :data-test-value="button.testValueAttribute"
                  @click="(event: Event) => { button.action(event, fieldKey, data, record) }"
                  class="font-normal text-left flex flex-row items-center p-3 py-1.5 gap-1">
                  {{ button.title }}
                </a>
              </li>
            </ul>
          </div>
        </template>
      </Dropdown>
    </span>
  </div>
</template>

<script setup lang="ts">
import Dropdown from '../Dropdown.vue';
import OverGridBtn from '../OverGridBtn.vue';
import { computed } from 'vue';

const props = defineProps<{
  data: any,
  l: Function,
  formatterConfig: {
    type: string,
    config?: any
  },
  rowid: string | number,
  fieldKey: string,
  record: any,
  refreshGrid: Function,
  openExtraRow: Function
}>()

const rowButtons = computed(() => {
  if (!props.formatterConfig || !props.formatterConfig?.config?.buttons) {
    return []
  }

  return props.formatterConfig?.config?.buttons;
})

const rowButtonsDropdowned = computed(() => {
  var btnz = rowButtons.value

  var result = []
  for (var i in btnz) {
    if (btnz[i].dropdowned) {
      result.push(btnz[i])
    }
  }

  return result
})

const rowButtonsNormal = computed(() => {
  var btnz = rowButtons.value

  var result = []
  for (var i in btnz) {
    if (!btnz[i].dropdowned) {
      result.push(btnz[i])
    }
  }

  return result
})
</script>
