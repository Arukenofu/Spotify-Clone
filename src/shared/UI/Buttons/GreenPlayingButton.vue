<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { Tippy } from 'vue-tippy'
import PlayingState from '@/shared/UI/Icons/PlayingState.vue'

interface Props {
  state: boolean
  innerStyle?: CSSProperties
  playingTooltip?: string
  stoppedTooltip?: string
}

defineProps<Props>()
</script>

<template>
  <Tippy class="v-content" :content="state ? playingTooltip : stoppedTooltip">
    <button class="v-button">
      <PlayingState
        class="icon"
        :style="innerStyle"
        :state="state"
      />
    </button>
  </Tippy>
</template>

<style lang="scss" scoped>
.v-content {
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.3);
  background: none;
  border-radius: 50%;
  height: 48px;
  width: 48px;

  .v-button {
    width: 100%;
    height: 100%;
    background-color: var(--main-color);
    border: none;
    cursor: pointer;
    display: grid;
    place-items: center;
    transition-duration: 300ms;
    transition-property: background-color, border-color, color, box-shadow, filter,
    transform, opacity;
    border-radius: 50%;

    &:hover {
      scale: 1.04;
      filter: brightness(1.2);
    }

    &:active, &:focus {
      scale: 1 !important;
    }

    .icon {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
