<script setup lang="ts">
import {ref} from "vue";

interface Props {
  image: string;
  alt?: string;
  color?: string | null;
}

defineProps<Props>();

const isLoaded = ref<boolean>(false);

function onImageLoad() {
  isLoaded.value = true;
}
</script>

<template>
  <div class="lazyImage">
    <img
      :src="image"
      :alt="alt"
      :class="isLoaded && 'v-img-loaded'"
      loading="lazy"
      class="image"
      draggable="false"
      @load="onImageLoad"
    />
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

.v-img-loaded {
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