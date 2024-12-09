<script setup lang="ts">
import GreenPlayingButton from "@/UI/Buttons/GreenPlayingButton.vue";
import ThreeDots from "@/UI/Icons/Shared/ThreeDots.vue";
import GeneralGradientSection from "@/UI/Blocks/GeneralGradientSection.vue";

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
</script>

<template>
  <GeneralGradientSection :bg-color>
    <GreenPlayingButton
      v-tooltip="isPlaying ? 'Пауза' : 'Слушать'"
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

  .controls {
    width: 100%;
    height: 56px;
    padding: var(--content-spacing);
    box-sizing: content-box;
    display: flex;
    align-items: center;

    .playingButton {
      height: 100%;
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