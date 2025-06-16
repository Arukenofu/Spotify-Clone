<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Tippy } from 'vue-tippy'
import GreenPlayingButton from '@/shared/UI/Buttons/GreenPlayingButton.vue'
import GeneralGradientSection from '@/shared/UI/EntityPageElements/GeneralGradientSection.vue'
import ThreeDots from '@/shared/UI/Icons/ThreeDots.vue'

interface Props {
  isPlaying: boolean
  tooltipStr: string
  bgColor: string | null
  turnoffOptions?: boolean
}

interface Emit {
  playClick: []
  dotsClick: []
}

const { bgColor = '#333333', turnoffOptions = false } = defineProps<Props>()
defineEmits<Emit>()

const { t } = useI18n()
</script>

<template>
  <GeneralGradientSection :bg-color>
    <GreenPlayingButton
      class="playingButton"
      :state="isPlaying"
      :playing-tooltip="t('music-actions.pauseMusic')"
      :stopped-tooltip="t('music-actions.playMusic')"
      @click="$emit('playClick')"
    />
    <slot name="main-options" />
    <Tippy class="dots-wrapper" :content="tooltipStr">
      <button
        v-if="!turnoffOptions"
        v-disable-child
        class="options"
        @click="$emit('dotsClick')"
      >
        <ThreeDots class="icon" />
      </button>
    </Tippy>
    <slot name="additional-options" />
  </GeneralGradientSection>
</template>

<style scoped lang="scss">
.general {
  position: relative;

  .play-button-wrapper {
    margin-right: calc(var(--content-spacing) + 8px);

    .playingButton {
      height: 56px;
      width: auto;
      aspect-ratio: 1/1;
      box-shadow: none;
    }
  }

  .dots-wrapper {
    margin-right: var(--content-spacing);

    .options {
      width: 32px;
      height: 32px;
      background: none;
      border: none;
      cursor: pointer;

      &:hover .icon {
        fill: var(--white);
        scale: 1.05;
      }

      .icon {
        fill: var(--text-soft);
      }
    }
  }

  .background {
    top: 0;
    position: absolute;
    background-color: v-bind(bgColor);
    background-image: linear-gradient(rgba(0,0,0,.6) 0, var(--ui) 100%),var(--background-noise);
    height: 232px;
    width: 100%;
    z-index: -1;
  }
}
</style>
