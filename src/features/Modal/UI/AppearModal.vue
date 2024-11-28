<script setup lang="ts">
import ScrollableBlock from "@/UI/Blocks/ScrollableBlock.vue";
import CloseIcon from "@/UI/Icons/Shared/CloseIcon.vue";

defineEmits<{
  close: []
}>();
</script>

<template>
  <Transition name="content" appear>
    <ScrollableBlock class="content" :allow-style-shadow="false" gap="0">
      <button class="close" @click="$emit('close')">
        <CloseIcon class="icon" />
      </button>

      <slot />
    </ScrollableBlock>
  </Transition>
</template>

<style scoped lang="scss">
.content {
  background-color: var(--ui);
  border-radius: 8px;
  height: 70vh;
  min-width: 500px;
  width: 100vw;
  max-width: 768px;
  overflow: hidden;
  position: fixed;
  scale: 1;

  .close {
    position: fixed;
    top: 16px;
    right: 16px;
    background-color: rgba(0,0,0,.7);
    border: none;
    border-radius: 50%;
    display: grid;
    place-items: center;
    height: 32px;
    width: 32px;
    cursor: pointer;

    &:hover {
      background-color: var(--ui);

      .icon {
        fill: var(--white);
      }
    }

    .icon {
      width: 16px;
      height: 16px;
      fill: var(--text-soft);
    }
  }
}

.content-enter-from, .content-leave-to {
  transform: translateY(25%) scale(.6);
}
.content-enter-to, .content-leave-from {
  transform: translateY(0) scale(1);
}
.content-enter-active, .content-leave-active {
  transition: transform .3s ease-out;
}
</style>