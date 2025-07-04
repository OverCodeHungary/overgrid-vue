<template>
  <CustomContentModal :show="props.aboutModal.isModalShown.value" :title="i18n.l('about')"
    :close="props.aboutModal.closeModal" :cancelButtonTitle="i18n.l('close')" :noNeedOkButton="true">
    <template #content>
      <div class="flex flex-col items-center justify-center">
        <h1 class="text-3xl font-bold">OverGrid</h1>
        <!-- <p>
          <strong>{{ props.l('version') }}:</strong> {{ VERSION }}
        </p> -->
        <div class="mt-2">
          Licence: <strong>MIT</strong>
        </div>
        <div>
          All rights reserved overcode.hu.
        </div>
      </div>
    </template>
  </CustomContentModal>
</template>

<script setup lang="ts">
import CustomContentModal from '../CustomContentModal.vue';
import type { OverGridUseAboutModalInterface } from '../../types/OverGridUseAboutModalInterface';
import useI18n from '../../composables/useI18n';
const i18n = useI18n();

//const VERSION = import.meta.env.PACKAGE_VERSION;

const props = defineProps<{
  aboutModal: OverGridUseAboutModalInterface
}>();


</script>
