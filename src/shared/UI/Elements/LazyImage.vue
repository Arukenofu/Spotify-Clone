<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface Props {
  image: string
  alt?: string
  color?: string | null
  loading?: 'lazy' | 'eager'
}

const { loading = 'lazy', image } = defineProps<Props>()

const imageClasses = ref<string>('')

onMounted(async () => {
  const loadImage = (url: string) => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => resolve(true)
      img.onerror = () => resolve(false)
      img.src = url
    })
  }

  const startTime = performance.now()
  const imageLoaded = await loadImage(image)
  const loadTime = performance.now() - startTime

  if (imageLoaded && loadTime < 50) {
    imageClasses.value = 'show'
  }
  else {
    imageClasses.value = 'animated-show'
  }
})
</script>

<template>
  <div class="lazyImage">
    <img
      ref="image"
      :src="image"
      :alt="alt"
      :class="imageClasses"
      :loading="loading"
      class="image"
      draggable="false"
    >
  </div>
</template>

<style scoped lang="scss">
.lazyImage {
  position: relative;
  background-color: v-bind(color);

  .mask, .image {
    object-fit: cover;
    object-position: center center;
    width: 100%;
    aspect-ratio: 1/1;
  }

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: inherit;
  }

  .image {
    border-radius: inherit;
    opacity: 0;
  }
}

.show {
  opacity: 1 !important;
}

.animated-show {
  animation: imageLoad .25s ease;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
}

@keyframes imageLoad {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
};
</style>
