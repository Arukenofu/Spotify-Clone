<script setup lang="ts">
import EntityAvatar1x1 from '@/shared/UI/Elements/EntityAvatar1x1.vue';
import EntityInfo from "@/features/MedialibSidebar/components/EntityInfo.vue";
import type {MediaLibEntityProps} from "@/features/MedialibSidebar/types/MediaLibEntityProps";
import PinnedComponent from "@/features/MedialibSidebar/components/PinnedComponent.vue";
import PlayingState from "@/shared/UI/Icons/PlayingState.vue";

const props = defineProps<MediaLibEntityProps>();
</script>

<template>
  <button class="list">
    <div class="avatar">
      <EntityAvatar1x1 class="image" :image="props.image" :type="props.type!" />
      <div v-if="type !== 'Folder'" class="overlay">
        <PlayingState class="icon" />
      </div>
    </div>

    <div class="text">
      <span class="playlist-name">
        {{ props.name }}
      </span>

      <span class="playlist-info">
        <PinnedComponent v-if="isPinned" class="pinned" />
        <EntityInfo v-bind="props" class="info" />
      </span>
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
    background-color: hsla(0,0%,100%,.1);

    .avatar .overlay {
      opacity: 1;
    }
  }

  &:active {
    background-color: var(--black);
  }

  .avatar {
    height: 100%;
    aspect-ratio: 1/1;
    border-radius: 4px;
    display: grid;
    place-items: center;
    position: relative;

    .image {
      background-color: #262626;
    }

    .overlay {
      z-index: 1 !important;
      position: absolute;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 0;
      display: grid;
      place-items: center;
      border-radius: 4px;

      .icon {
        fill: var(--white);
        height: 24px;
        width: 24px;
      }
    }
  }

  .text {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    text-align: left;

    .playlist-name {
      font-size: 1rem;
      font-weight: 500;
    }

    .playlist-info {

      .pinned {
        margin-right: 4px;
      }

      .info {
        font-size: 0.85rem;
        font-weight: 500;
        color: var(--text-soft);
      }
    }
  }
}
</style>