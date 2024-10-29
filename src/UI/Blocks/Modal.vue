<script setup lang="ts">
import ScrollableBlock from "@/UI/Blocks/ScrollableBlock.vue";
import CloseIcon from "@/UI/Icons/Shared/CloseIcon.vue";
import { onMounted, onUnmounted } from "vue";

const model = defineModel<boolean>({
  required: true
});

const {to = 'body'} = defineProps<{
  to?: string;
}>();

onMounted(() => {
  window.addEventListener('keydown', onKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown); 
});

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    model.value = false;
  }
}
</script>

<template>
  <Teleport :to="to">
    <Transition name="modal-background">
      <div v-if="model" class="modal-background" @click.self="model = false">
        <Transition name="content" appear>
          <ScrollableBlock class="content" :allow-style-shadow="false" gap="0">
            <button class="close" @click="model = false">
              <CloseIcon class="icon" />
            </button>

            <slot />
          </ScrollableBlock>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.modal-background {
  background-color: rgba(0,0,0,.7);
  inset: 0;
  position: absolute;
  display: grid;
  place-items: center;
  overflow: hidden;
  z-index: 2;

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

.modal-background-enter-from, .modal-background-leave-to {
  opacity: 0;
}
.modal-background-enter-to, .modal-background-leave-from {
  opacity: 1;
}
.modal-background-enter-active, .modal-background-leave-active {
  transition: opacity .3s linear;
}
</style>