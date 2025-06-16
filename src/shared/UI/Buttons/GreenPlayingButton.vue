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
  <Tippy class="content" :content="state ? playingTooltip : stoppedTooltip">
    <button class="button">
      <PlayingState
        class="icon"
        :style="innerStyle"
        :state="state"
      />
    </button>
  </Tippy>
</template>

<style lang="scss" scoped>
.content {
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.3);
  background: none;
  border-radius: 50%;

  .button {
    height: 48px;
    width: 48px;
    background-color: var(--main-color);
    border: none;
    cursor: pointer;
    display: grid;
    place-items: center;
    transition-duration: 300ms;
    transition-property: background-color, border-color, color, box-shadow, filter,
    transform, opacity;

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
