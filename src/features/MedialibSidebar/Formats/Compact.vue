<script setup lang="ts">
import EntityInfo from "@/features/MedialibSidebar/components/EntityInfo.vue";
import type {MediaLibEntityProps} from "@/features/MedialibSidebar/types/MediaLibEntityProps";

const props = defineProps<MediaLibEntityProps>();
</script>

<template>
  <button class="compact-playlist">
    {{ props.name }}

    <div class="info">
      <div class="divider">
        •
      </div>

      <EntityInfo v-bind="props" />
    </div>
  </button>
</template>

<style lang="scss" scoped>
.compact-playlist {
  background: none;
  border: none;
  height: 32px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 8px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  user-select: none;
  text-align: left;

  &:hover {
    background-color: var(--ui-highlight);
  }

  &:active {
    background-color: var(--black);
  }

  .info {
    display: flex;
    font-size: 0.875rem;
    font-weight: 500;

    :deep(span) {
      font-weight: 500;
      color: var(--text-soft);
    }
  }

  .divider {
    color: var(--text-soft);
    margin: 0 4px;
  }
}
</style>
