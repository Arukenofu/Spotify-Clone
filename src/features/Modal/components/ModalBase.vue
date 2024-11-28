<script setup lang="ts">
import type {ModalBaseProps} from "@/features/Modal/types/ModalBaseProps";

const {useTransition = true} = defineProps<ModalBaseProps>()
defineEmits<{
  close: []
}>()
</script>

<template>
  <Teleport :disabled="disableTeleport" to="body">
    <Transition :name="useTransition ? 'modal-background' : ''" appear>
      <div v-if="show" class="modal-background" @click.self="$emit('close')">
        <slot />
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