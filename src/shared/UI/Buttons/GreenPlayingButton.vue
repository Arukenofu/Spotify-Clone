<script setup lang="ts">
import type { CSSProperties } from 'vue'
import PlayingState from '@/shared/UI/Icons/PlayingState.vue'

interface Props {
  state: boolean
  innerStyle?: CSSProperties
}

defineProps<Props>()
</script>

<template>
  <button>
    <PlayingState
      class="icon"
      :style="innerStyle"
      :state="state"
    />
  </button>
</template>

<style lang="scss" scoped>
button {
  height: 48px;
  width: 48px;
  background-color: var(--main-color);
  border: none;
  border-radius: 50%;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.3);
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

  &:active {
    scale: 1 !important;
  }

  .icon {
    width: 24px;
    height: 24px;
  }
}
</style>
