<script setup lang="ts">
import CloseIcon from "@/shared/UI/Icons/CloseIcon.vue";

defineEmits<{
  onRemove: []
}>();
</script>

<template>
  <div class="remove-wrapper">
    <button class="remove" @click="$emit('onRemove')">
      <CloseIcon class="icon" />
    </button>

    <slot />
  </div>
</template>

<style scoped lang="scss">
.remove-wrapper {
  position: relative;

  .remove {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 28px;
    height: 28px;
    z-index: 2 !important;
    display: grid;
    place-items: center;
    background-color: rgba(0,0,0,.3);
    border: none;
    border-radius: 50%;
    transform: scale(1);
    transform-origin: center;

    &:hover {
      transform: scale(1.1);
    }

    .icon {
      width: 16px;
      height: 16px;
      fill: var(--white);
    }
  }
}
</style>