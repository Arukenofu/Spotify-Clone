<script setup lang="ts">
import type { FormatProps } from '@/features/FormatSidebarPlaylist/types/FormatProps';
import GreenPlayingButton from '@/UI/Buttons/GreenPlayingButton.vue';
import EntityAvatar1x1 from '@/UI/Elements/EntityAvatar1x1.vue';
import localizeTypes from '../utils/localizeTypes';

interface GridFormatProps extends FormatProps {
  minimized: boolean;
}

defineProps<GridFormatProps>();
</script>

<template>
  <RouterLink
    :to="`/playlist/${to}`"
    class="block"
    :class="!minimized && 'unminimized'"
  >
    <EntityAvatar1x1 class="picture" :type="type" :image="image">
      <GreenPlayingButton
        v-if="!minimized && type !== 'Folder'"
        v-tooltip="`Слушать плейлист «${name}»`"
        :state="false"
        class="stateButton"
      />
    </EntityAvatar1x1>

    <div
      v-if="!minimized"
      class="text"
    >
      <span class="name">{{ name }}</span>
      <span class="info">{{ localizeTypes(type) }} • {{ owner }}</span>
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
.unminimized {
  padding: 12px !important;
  position: relative;

  .picture {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
    position: relative;

    .stateButton {
      opacity: 0;
      transition: all 200ms ease;
      position: absolute;
      right: 8px;
      bottom: 8px;
      transform: translateY(8px);
    }
  }

  &:after {
    content: '';
    position: absolute;
    border-radius: 6px;
    inset: 12px;
    transition: all 300ms ease;
  }

  &:hover {
    background-color: transparent !important;

    .picture .stateButton {
      opacity: 1;
      transform: translateY(0);
    }

    &:after {
      inset: 0;
      background-color: var(--ui-highlight);
    }
  }
}

.block {
  display: grid;
  gap: 8px;
  border-radius: 6px;
  width: 100%;
  height: 100%;
  padding: 4px;
  transition: all 0.2s;

  .text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    align-items: flex-start;
    flex-basis: 100%;
    z-index: 1;

    span {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      line-clamp: 1;
    }

    .name {
      font-size: 1rem;
      font-weight: 600;
    }

    .info {
      font-size: 0.875rem;
      color: var(--text-soft);
    }
  }
}
</style>
