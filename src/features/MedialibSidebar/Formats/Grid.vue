<script setup lang="ts">
import GreenPlayingButton from '@/UI/Buttons/GreenPlayingButton.vue';
import EntityAvatar1x1 from '@/UI/Elements/EntityAvatar1x1.vue';
import {computed} from "vue";
import EntityInfo from "@/features/MedialibSidebar/components/EntityInfo.vue";
import type {MediaLibEntityProps} from "@/features/MedialibSidebar/types/MediaLibEntityProps";
import type {TippyOptions} from "vue-tippy";

type GridFormatProps = {
  minimized: boolean;
} & MediaLibEntityProps;

const props = defineProps<GridFormatProps>();

const tooltip = computed<TippyOptions>(() => {
  if (!props.minimized) {
    return {};
  }

  const titleStyle = 'font-weight: 400; font-size: 1rem; margin-bottom: 2px';
  const bodyStyle = 'font-weight: 400; color: var(--text-soft); font-size: .875rem';

  const content = `
    <p style="${titleStyle}">${props.name}</p>
    <p style="${bodyStyle}">${props.type}</p>
  `;

  return {
    content,
    placement: 'right',
    delay: 100,
    allowHTML: true
  }
});
</script>

<template>
  <button
    v-tooltip="tooltip"
    class="block"
    :class="!minimized && 'unminimized'"
  >
    <EntityAvatar1x1 class="picture" :type="type!" :image="image">
      <GreenPlayingButton
        v-if="!minimized && type !== 'Folder'"
        v-tooltip="`Слушать плейлист «${name}»`"
        :state="false"
        class="stateButton"
      />
    </EntityAvatar1x1>

    <div v-if="!minimized" class="text">
      <span class="name">{{ name }}</span>
      <EntityInfo v-bind="props" class="info" />
    </div>
  </button>
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
    background-color: var(--ui-highlight);
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
</style>
