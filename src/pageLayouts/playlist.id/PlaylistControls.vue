<script setup lang="ts">
import {reactive} from "vue";
import GeneralGradientSectionWithControls
  from "@/shared/UI/EntityPageElements/Sugar/GeneralGradientSectionWithControls.vue";
import CheckedRoundCircleIcon from "@/shared/UI/Icons/CheckedRoundCircleIcon.vue";
import RoundPlusIcon from "@/shared/UI/Icons/RoundPlusIcon.vue";
import FormatLibraryButton from "@/shared/UI/Buttons/FormatLibraryButton.vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n();

const props = defineProps<{
  playlistId: string;
  playlistName: string;
  maskColor: string | null;
  isAdded: boolean;
  isPlaying: boolean;
}>();

const tooltips = reactive({
  addButton: {
    content: props.isAdded ? t('contextmenu-items.removeFromMedialib') : t('contextmenu-items.addToMedialib'),
    distance: 24
  },
  options: t('music-actions.moreOptionsFor', [props.playlistName])
});
</script>

<template>
  <GeneralGradientSectionWithControls
    :is-playing="isPlaying"
    :tooltip-str="tooltips.options"
    :bg-color="maskColor"
  >
    <template #main-options>
      <button v-tooltip="tooltips.addButton" class="state">
        <CheckedRoundCircleIcon v-if="isAdded" class="remove" />
        <RoundPlusIcon v-else class="add" />
      </button>
    </template>

    <template #additional-options>
      <FormatLibraryButton />
    </template>
  </GeneralGradientSectionWithControls>
</template>

<style scoped lang="scss">
.state {
  width: 32px;
  height: 32px;
  cursor: pointer;
  background: none;
  border: none;
  margin-right: var(--content-spacing);

  .add {
    fill: var(--text-soft);

    &:hover {
      fill: var(--white);
      scale: 1.05;
    }
  }

  .remove {
    fill: var(--main-color);

    &:hover {
      scale: 1.05;
    }
  }
}
</style>