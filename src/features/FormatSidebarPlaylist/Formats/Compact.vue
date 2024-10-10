<script setup lang="ts">
import type { FormatProps } from '@/features/FormatSidebarPlaylist/types/FormatProps';
import localizeTypes from '../utils/localizeTypes';

defineProps<FormatProps>();
</script>

<template>
  <RouterLink
    :to="`/playlist/${to}`"
    class="compact-playlist"
  >
    {{ name }}

    <template v-if="type === 'Playlist'">
      <div class="divider">
        •
      </div>

      <div class="type">
        {{ localizeTypes(type) }}
      </div>
    </template>
  </RouterLink>
</template>

<style lang="scss" scoped>
.compact-playlist {
  height: 32px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0 8px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  user-select: none;

  .type,
  .divider {
    color: var(--text-soft);
    font-size: 0.9rem;
    font-weight: 600;
  }
}
</style>
