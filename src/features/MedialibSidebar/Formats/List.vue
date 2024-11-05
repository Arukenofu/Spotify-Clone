<script setup lang="ts">
import type { FormatProps } from '../types/FormatProps';
import EntityAvatar1x1 from '@/UI/Elements/EntityAvatar1x1.vue';
import localizeEntities from "../../../services/utils/localizeEntities";

defineProps<FormatProps>();
</script>

<template>
  <RouterLink
    class="list"
    :to="`/playlist/${id}`"
  >
    <EntityAvatar1x1 :image="image" type="Folder" />

    <div class="text">
      <span class="playlist-name">
        {{ name }}
      </span>

      <span class="info"> {{ localizeEntities(type) }} • {{ owner }} </span>
    </div>
  </RouterLink>
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
