<script setup lang="ts">
import GreenPlayingButton from "@/shared/UI/Buttons/GreenPlayingButton.vue";
import ThreeDots from "@/shared/UI/Icons/ThreeDots.vue";
import GeneralGradientSection from "@/shared/UI/EntityPageElements/GeneralGradientSection.vue";
import {useI18n} from "vue-i18n";

interface Props {
  isPlaying: boolean;
  tooltipStr: string | object;
  bgColor: string | null;
  turnoffOptions?: boolean;
}

type Emit = {
  playClick: [],
  dotsClick: [];
}

const {bgColor = '#333333', turnoffOptions = false} = defineProps<Props>();
defineEmits<Emit>();

const {t} = useI18n();
</script>

<template>
  <GeneralGradientSection :bg-color>
    <GreenPlayingButton
      v-tooltip="isPlaying ? t('music-actions.pauseMusic') : t('music-actions.playMusic')"
      class="playingButton"
      :state="isPlaying"
      @click="$emit('playClick')"
    />
    <slot name="main-options" />
    <button
      v-if="!turnoffOptions"
      v-tooltip="tooltipStr"
      v-disable-child
      class="options"
      @click="$emit('dotsClick')"
    >
      <ThreeDots class="icon" />
    </button>
    <slot name="additional-options" />
  </GeneralGradientSection>
</template>

<style scoped lang="scss">
.general {
  position: relative;

  .playingButton {
    height: 56px;
    width: auto;
    aspect-ratio: 1/1;
    margin-right: calc(var(--content-spacing) + 8px);
    box-shadow: none;
  }

  .options {
    width: 32px;
    height: 32px;
    margin-right: var(--content-spacing);
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