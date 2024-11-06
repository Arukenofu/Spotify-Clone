<script setup lang="ts">
import EntityAvatar1x1 from '@/UI/Elements/EntityAvatar1x1.vue';
import EntityInfo from "@/features/MedialibSidebar/components/EntityInfo.vue";
import type {MediaLibEntityProps} from "@/features/MedialibSidebar/types/MediaLibEntityProps";

const props = defineProps<MediaLibEntityProps>();
</script>

<template>
  <button class="list">
    <EntityAvatar1x1 :image="props.image" :type="props.type!" />

    <div class="text">
      <span class="playlist-name">
        {{ props.name }}
      </span>

      <EntityInfo v-bind="props" class="info" />
    </div>
  </button>
</template>

<style lang="scss" scoped>
.list {
  display: flex;
  gap: 8px 12px;
  height: 64px;
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  user-select: none;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: var(--ui-highlight);
  }

  &:active {
    background-color: var(--black);
  }

  .picture {
    height: 100%;
    aspect-ratio: 1/1;
    background-color: #272727;
    border-radius: 4px;
    display: grid;
    place-items: center;

    .noAvatar {
      height: 24px;
      width: 24px;
      fill: var(--text-soft);
    }
  }

  .text {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    text-align: left;

    .playlist-name {
      font-size: 1rem;
      font-weight: 600;
    }

    .info {
      font-size: 0.85rem;
      font-weight: 500;
      color: var(--text-soft);
    }
  }
}
</style>