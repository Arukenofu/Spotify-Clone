<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import ModalBase from '@/features/Modal/components/ModalBase.vue'

const emit = defineEmits<{
  close: []
}>()

const model = defineModel<boolean>({ required: true })

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    model.value = false
    emit('close')
  }
}
</script>

<template>
  <ModalBase :show="model" @close="model = false; $emit('close')">
    <slot />
  </ModalBase>
</template>

<style scoped lang="scss">

</style>
