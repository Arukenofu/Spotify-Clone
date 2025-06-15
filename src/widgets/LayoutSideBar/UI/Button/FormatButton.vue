<script setup lang="ts">
import type { FormatTypes } from '#imports'
import type { sortOption } from '@/features/MedialibSidebar/constants/sorts'
import { computed } from 'vue'
import CompactIcon from '@/shared/UI/Icons/CompactIcon.vue'
import GridIcon from '@/shared/UI/Icons/GridIcon.vue'
import ListIcon from '@/shared/UI/Icons/ListIcon.vue'

interface Props {
  formatComponentName: FormatTypes
  sortName: sortOption
}

const { formatComponentName } = defineProps<Props>()

const currentComponent = computed(() => {
  if (formatComponentName === 'Grid') {
    return GridIcon
  }
  if (formatComponentName === 'Compact') {
    return CompactIcon
  }
  return ListIcon
})
</script>

<template>
  <button class="format">
    <span class="added-at">
      {{ sortName }}
    </span>

    <span class="icon">
      <Component :is="currentComponent" />
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

    .added-at {
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

  .added-at {
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
