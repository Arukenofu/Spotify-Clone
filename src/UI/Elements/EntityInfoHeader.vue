<script setup lang="ts">
import EntityAvatar1x1 from "@/UI/Elements/EntityAvatar1x1.vue";
import type {Entities} from "@/services/types/Entities";

interface Props {
  image: string | null;
  mask: string | null;
  type: Entities;
}

const {mask = '#333333'} = defineProps<Props>();
</script>

<template>
  <div class="info-content">
    <div class="info">
      <div class="info-image">
        <EntityAvatar1x1 class="img" :type="type" :image="image" />
      </div>
      <div class="text-info">
        <slot />
      </div>
    </div>

    <div class="bg" />
    <div class="bg-subbed" />
  </div>
</template>

<style scoped lang="scss">
.info-content {
  height: min(30vh, var(--fluid-height));
  max-height: 300px;
  min-height: var(--min-fluid-height);
  padding-bottom: var(--content-spacing);
  position: relative;

  .info {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    padding: 0 var(--content-spacing);

    .info-image {
      --size: clamp(128px, 128px + (100vw - var(--sidebar-width) * 1px - var(--panel-width) * 1px - 600px) / 424 * 104, 232px);
      margin-right: var(--content-spacing);
      width: var(--size);
      height: var(--size);
      z-index: 1 !important;

      .img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
        border-radius: 50%;
        box-shadow: 0 4px 60px rgba(0,0,0,.02);
        user-select: none;
      }
    }

    .text-info {
      display: flex;
      flex: 1;
      flex-flow: column;
      justify-content: flex-end;
      z-index: 1 !important;
    }
  }

  .bg {
    display: block;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    background-color: v-bind(mask);
  }

  .bg-subbed {
    display: block;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    background: linear-gradient(transparent 0, rgba(0,0,0,.5) 100%),var(--background-noise);
  }
}
</style>