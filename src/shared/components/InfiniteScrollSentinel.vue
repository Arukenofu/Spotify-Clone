<script setup lang="ts" generic="T extends any[]">
import { onMounted, onUnmounted, type StyleValue, useTemplateRef } from 'vue'

defineProps<{
  sentinelStyle?: StyleValue
}>()

const emit = defineEmits<{
  dataUpdate: []
}>()

const sentinel = useTemplateRef<HTMLElement>('sentinel')
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    const [entry] = entries
    if (entry.isIntersecting) {
      emit('dataUpdate')
    }
  })

  if (sentinel.value) {
    observer.observe(sentinel.value)
  }
})

onUnmounted(() => {
  if (observer && sentinel.value) {
    observer.unobserve(sentinel.value)
  }
})
</script>

<template>
  <div class="v-scroll">
    <slot />

    <div ref="sentinel" class="sentinel" :style="sentinelStyle" />
  </div>
</template>

<style scoped lang="scss">

</style>
