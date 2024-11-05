<script setup lang="ts">
import { computed } from 'vue';
import { usePlaylistFormat } from '@/features/MedialibSidebar';
import GridIcon from '@/UI/Icons/Shared/GridIcon.vue';
import CompactIcon from '@/UI/Icons/Shared/CompactIcon.vue';
import ListIcon from '@/UI/Icons/Shared/ListIcon.vue';

const sortTypes = [
  'Недавно прослушано',
  'Недавно добавленные',
  'По алфавиту',
  'По автору',
  'Свой порядок'
];

const { getComponentName } = usePlaylistFormat();

const getFormatButtonIcon = computed(() => {
  if (getComponentName.value === 'Grid') {
    return GridIcon;
  }

  if (getComponentName.value === 'Compact') {
    return CompactIcon;
  }

  return ListIcon;
});
</script>

<template>
  <button class="format">
    <span class="text">
      {{ sortTypes[0] }}
    </span>

    <span class="icon">
      <Component :is="getFormatButtonIcon" />
    </span>
  </button>
</template>

<style lang="scss" scoped>
.format {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  position: relative;
  opacity: 1;
  transition: opacity 0.1s;

  &:hover {
    transform: scale(1.04);
    transform-origin: center;

    .text {
      color: var(--white);
    }

    .icon {
      fill: var(--white);
    }
  }

  span {
    pointer-events: none;
  }

  &:active {
    transform: scale(1);
    opacity: 0.5;
  }

  .text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--text-soft);
    font-size: 0.85rem;
    font-weight: 600;
  }

  .icon {
    margin-left: 5px;
    width: 16px;
    height: 16px;
    fill: var(--text-soft);

    svg {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
