<script setup lang="ts">
import GreenPlayingButton from '@/UI/Buttons/GreenPlayingButton.vue';
import EntityAvatar1x1 from '@/UI/Elements/EntityAvatar1x1.vue';
import EntityInfo from "@/features/MedialibSidebar/components/EntityInfo.vue";
import type {MediaLibEntityProps} from "@/features/MedialibSidebar/types/MediaLibEntityProps";
import {Tippy} from "vue-tippy";
import PinnedComponent from "@/features/MedialibSidebar/components/PinnedComponent.vue";
import {useI18n} from "vue-i18n";

type GridFormatProps = {
  minimized: boolean;
} & MediaLibEntityProps;

const props = defineProps<GridFormatProps>();

const {t} = useI18n();
</script>

<template>
  <Tippy
    tag="button"
    placement="right"
    :delay="100"
    :allow-html="true"
    class="block"
    :class="!minimized && 'unminimized'"
  >
    <EntityAvatar1x1 class="picture" :type="type!" :image="image">
      <GreenPlayingButton
        v-if="!minimized && type !== 'Folder'"
        v-tooltip="false ? t('music-actions.stopPlaylist', [name]) : t('music-actions.playPlaylist', [name])"
        :state="false"
        class="stateButton"
      />
    </EntityAvatar1x1>

    <div v-if="!minimized" class="text">
      <span class="name">{{ name }}</span>
      <span class="body">
        <PinnedComponent v-if="isPinned" class="pinned" />
        <EntityInfo v-bind="props" class="info" />
      </span>
    </div>

    <template #content>
      <div v-if="minimized" class="tooltip">
        <p class="title">{{name}}</p>
        <p class="body">
          <PinnedComponent v-if="isPinned" class="pinned" />
          <EntityInfo class="info" v-bind="props" />
        </p>
      </div>
    </template>
  </Tippy>
</template>

<style lang="scss" scoped>
.unminimized {
  padding: 12px !important;
  position: relative;
  text-align: left;

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
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: var(--ui-highlight) !important;
  }

  &:active {
    background-color: var(--black);
  }

  .text {
    display: flex;
    flex-direction: column;
    gap: 6px;
    align-items: flex-start;
    flex-basis: 100%;
    z-index: 1;

    .name, .info {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      line-clamp: 1;
      -moz-box-orient: vertical;
      overflow: hidden;
    }

    .body {
      display: inline-flex;

      .pinned {
        margin-right: 4px;
      }
    }

    .name {
      font-size: 1rem;
      font-weight: 500;
    }

    .info {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-soft);
    }
  }
}

.tooltip {
  display: grid;
  gap: 6px;
  padding: 2px 1px;

  .title {
    font-size: 1rem;
    font-weight: 500;
  }

  .body {
    .pinned {
      margin-right: 4px;
    }

    &:deep(span) {
      font-size: .875rem;
      font-weight: 500;
      color: var(--text-soft);
    }
  }
}
</style>
