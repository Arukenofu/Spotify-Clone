<script setup lang="ts">
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { Tippy } from 'vue-tippy'
import FormatLibraryButton from '@/shared/UI/Buttons/FormatLibraryButton.vue'
import GeneralGradientSectionWithControls
  from '@/shared/UI/EntityPageElements/Sugar/GeneralGradientSectionWithControls.vue'
import CheckedRoundCircleIcon from '@/shared/UI/Icons/CheckedRoundCircleIcon.vue'
import RoundPlusIcon from '@/shared/UI/Icons/RoundPlusIcon.vue'

const props = defineProps<{
  playlistId: string
  playlistName: string
  maskColor: string | null
  isAdded: boolean
  isPlaying: boolean
}>()

const emits = defineEmits<{
  playClick: []
}>()

const { t } = useI18n()

const tooltips = reactive({
  addButton: {
    content: props.isAdded ? t('contextmenu-items.removeFromMedialib') : t('contextmenu-items.addToMedialib'),
    distance: 24,
  },
  options: t('music-actions.moreOptionsFor', [props.playlistName]),
})
</script>

<template>
  <GeneralGradientSectionWithControls
    :is-playing="isPlaying"
    :tooltip-str="tooltips.options"
    :bg-color="maskColor"
    @play-click="emits('playClick')"
  >
    <template #main-options>
      <Tippy :content="tooltips.addButton.content">
        <button class="state">
          <CheckedRoundCircleIcon v-if="isAdded" class="remove" />
          <RoundPlusIcon v-else class="add" />
        </button>
      </Tippy>
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
