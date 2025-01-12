<script setup lang="ts">
import LazyImage from "@/shared/UI/Elements/LazyImage.vue";

defineProps<{
  id: string;
  image: string;
  maskColor: string | null;
}>();

</script>

<template>
  <RouterLink
    class="card"
    :to="`/genre/${id}`"
    draggable="false"
  >
    <div class="name">
      <slot />
    </div>

    <LazyImage
      class="image"
      :image="image"
    />
  </RouterLink>
</template>

<style scoped lang="scss">
.card {
  display: block;
  aspect-ratio: 16/10;
  background-color: v-bind(maskColor);
  border-radius: 9px;
  position: relative;
  overflow: hidden;

  .name {
    position: absolute;
    hyphens: auto;
    font-weight: 900;
    font-size: 1.5rem;
    padding: 16px;
    padding-inline-end: 30%;
    line-height: 1.375;
  }

  .image {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 45%;
    transform: rotate(25deg) translate(18%, -2%);
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
}
</style>