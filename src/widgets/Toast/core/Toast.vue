<script setup lang="ts">
import {useToastStore} from "@/widgets/Toast/store/useToastStore";

const store = useToastStore();
</script>

<template>
  <div class="core">
    <TransitionGroup name="transition">
      <div
        v-for="(toast, index) in store.toasts"
        :key="toast"
        class="toast"
        @click="store.toasts.splice(index, 1)"
      >
        {{toast}}
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped lang="scss">
.core {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 14px;
  z-index: 3;

  .toast {
    max-width: 450px;
    margin-top: 9px;
    background-color: var(--white);
    color: var(--black);
    user-select: none;
    padding: 16px 12px;
    border-radius: 6px;
    font-weight: 400;
    text-align: center;
  }
}

.transition-enter-active,
.transition-leave-active {
  transition: all 0.5s ease;
}
.transition-enter-from,
.transition-leave-to {
  opacity: 0;
}
</style>