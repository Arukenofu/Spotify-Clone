<script setup lang="ts">
import type { MediaLibEntityProps } from '@/features/MedialibSidebar/types/MediaLibEntityProps'
import EntityInfo from '@/features/MedialibSidebar/components/EntityInfo.vue'
import PinnedComponent from '@/features/MedialibSidebar/components/PinnedComponent.vue'

const props = defineProps<MediaLibEntityProps>()
</script>

<template>
  <button class="compact-playlist">
    <PinnedComponent v-if="isPinned" class="pinned" />

    <span class="main">
      {{ props.name }}
      <span class="info">
        <span class="divider">
          •
        </span>

        <EntityInfo v-bind="props" />
      </span>
    </span>
  </button>
</template>

<style lang="scss" scoped>
.compact-playlist {
  background: none;
  border: none;
  height: 32px;
  padding: 0 8px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  user-select: none;
  text-align: left;
  display: inline;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: calc(var(--sidebar-width-px) - (7px * 2));
  color: var(--text-soft);

  &:hover {
    background-color: var(--ui-highlight);
  }

  &:active {
    background-color: var(--black);
  }

  .main {
    color: var(--white);
  }

  .pinned {
    margin-right: 8px;
  }

  .info {
    font-size: 0.875rem;
    font-weight: 500;
    white-space: nowrap;

    :deep(span) {
      font-weight: 500;
      color: var(--text-soft);
    }
  }

  .divider {
    text-align: center;
    color: var(--text-soft);
  }
}
</style>
