<script setup lang="ts">
import { computed } from 'vue';
import LibraryIcon from '@/UI/Icons/Shared/LibraryIcon.vue';
import PlusIcon from '@/UI/Icons/Shared/PlusIcon.vue';
import ArrowIcon from '@/UI/Icons/Shared/ArrowIcon.vue';
import RoundButton from '@/UI/Buttons/RoundButton.vue';
import createPlaylistContextMenu from '@/widgets/LayoutSideBar/contextMenu/createPlaylistContextMenu.vue';
import defaultWidth from '@/widgets/LayoutSideBar/constants/defaultWidth';
import max from '@/widgets/LayoutSideBar/constants/max';
import { showContextMenu } from '@/features/ContextMenu';
import { useSidebarWidthStore } from '@/features/FormatSidebarPlaylist';

const { isMinimized, currentWidth } = useSidebarWidthStore();

function toggleSidebar() {
  if (isMinimized.value) {
    currentWidth.value = defaultWidth;
  } else {
    currentWidth.value = 72;
  }
}

const widthArrowDirection = computed(() => {
  if (currentWidth.value < 450) {
    return 'right';
  } else {
    return 'left';
  }
});

function toggleWidth() {
  if (widthArrowDirection.value === 'left') {
    currentWidth.value = defaultWidth;
  } else {
    currentWidth.value = max;
  }
}

const tooltip= computed(() => {
  const placement = isMinimized.value ? 'right' : 'top'
  const content = isMinimized.value ? 'Открыть мою медиатеку' : 'Закрыть мою медиатеку';

  return {
    content,
    placement
  };
});
</script>

<template>
  <div class="medialib">
    <button
      v-tooltip="tooltip"
      class="toggle"
      @click="toggleSidebar()"
    >
      <LibraryIcon :state="!isMinimized" class="icon" />

      <span
        v-if="!isMinimized"
        class="text"
      > Моя медиатека </span>
    </button>

    <div
      v-if="!isMinimized"
      class="other-controls"
    >
      <RoundButton
        v-tooltip="'Создать плейлист или папку'"
        class="createPlaylist"
        @click="
          showContextMenu($event, createPlaylistContextMenu, {
            design: 'minimal',
            stickOn: 'currentElement',
            inset: 12
          })
        "
      >
        <PlusIcon class="icon" />
      </RoundButton>

      <RoundButton
        v-tooltip="currentWidth < 450 ? 'Развернуть' : 'Свернуть'"
        class="toggleWidth"
        @click="toggleWidth()"
      >
        <ArrowIcon
          class="icon"
          :direction="widthArrowDirection"
        />
      </RoundButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.medialib {
  display: flex;
  align-items: center;
  margin: 4px 0;
  padding: 8px var(--medialib-padding-x);
  height: 56px;

  .toggle {
    display: flex;
    align-items: center;
    padding: 4px 8px;
    gap: 12px;

    &:hover {
      .icon {
        fill: var(--white);
      }
    }

    .text {
      font-weight: 900;
      font-size: 1rem;
    }

    &:deep(.icon) {
      width: 24px;
      height: 24px;
      fill: var(--text-soft);
    }
  }

  .other-controls {
    margin-left: auto;
    display: flex;
    gap: 8px;

    &:deep(.icon) {
      width: 16px;
      height: 16px;
    }
  }
}

* {
  color: var(--text-soft);
  transition:
    color 0.2s linear,
    fill 0.2s linear;
}

:deep(.icon) {
  fill: var(--text-soft);
}

button {
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    .text {
      color: var(--white);
    }
  }
}
</style>
