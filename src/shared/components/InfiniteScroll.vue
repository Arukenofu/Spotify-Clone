<script setup lang="ts" generic="T extends any[]">
import {onMounted, onUnmounted, useTemplateRef} from "vue";

const emit = defineEmits<{
  dataUpdate: []
}>();

const sentinel = useTemplateRef<HTMLElement>('sentinel');
let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      emit('dataUpdate');
    }
  });

  if (sentinel.value) {
    observer.observe(sentinel.value);
  }
});

onUnmounted(() => {
  if (observer && sentinel.value) {
    observer.unobserve(sentinel.value);
  }
});
</script>

<template>
  <div class="v-scroll">
    <slot></slot>

    <div ref="sentinel" class="sentinel" />
  </div>
</template>

<style scoped lang="scss">

</style>