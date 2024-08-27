<script setup lang="ts">
import {computed} from "vue";
import LibraryIcon from "@/widgets/LayoutSideBar/UI/Icons/LibraryIcon.vue";
import PlusIcon from "@/UI/Icons/Shared/PlusIcon.vue";
import ArrowIcon from "@/UI/Icons/Shared/ArrowIcon.vue";
import RoundButton from "@/UI/Buttons/RoundButton.vue";
import createPlaylistContextMenu from "@/widgets/LayoutSideBar/contextMenu/createPlaylistContextMenu.vue";
import defaultWidth from "@/widgets/LayoutSideBar/constants/defaultWidth";
import max from "@/widgets/LayoutSideBar/constants/max";
import {showContextMenu} from "@/features/ContextMenu";
import {useSidebarWidthStore} from "@/features/FormatSidebarPlaylist";

const {isMinimized, currentWidth} = useSidebarWidthStore();

function toggleSidebar() {
  if (isMinimized.value) {
    isMinimized.value = !isMinimized.value;
    currentWidth.value = defaultWidth;
  } else {
    isMinimized.value = !isMinimized.value;
    currentWidth.value = 72;
  }
}

const widthArrowDirection = computed(() => {
  if (currentWidth.value < 450) {
    return 'right'
  } else {
    return 'left'
  }
});

function toggleWidth() {
  if (widthArrowDirection.value === 'left') {
    currentWidth.value = defaultWidth;
  } else {
    currentWidth.value = max;
  }
}

</script>

<template>
  <div class="medialib">
    <button
        v-if="isMinimized"
        class="toggle"
        @click="toggleSidebar()"
        v-tooltip.right="isMinimized ? 'Открыть мою медиатеку' : 'Закрыть мою медиатеку'"
    >
      <LibraryIcon class="icon" />
    </button>

    <button
        v-else
        class="toggle"
        @click="toggleSidebar()"
        v-tooltip="isMinimized ? 'Открыть мою медиатеку' : 'Закрыть мою медиатеку'"
    >
      <LibraryIcon :state="true" class="icon" />
      <span class="text">
        Моя медиатека
      </span>
    </button>
    <!--  TODO: Find solution to minimize  -->

    <div class="other-controls" v-if="!isMinimized">
      <RoundButton
          class="createPlaylist"
          v-tooltip="'Создать плейлист или папку'"
          @click="showContextMenu($event, createPlaylistContextMenu, {
            style: 'minimal',
            stickOn: 'currentElement'
          })"
      >
        <PlusIcon class="icon" />
      </RoundButton>

      <RoundButton
          class="toggleWidth"
          v-tooltip="currentWidth < 450 ? 'Развернуть' : 'Свернуть'"
          @click="toggleWidth()"
      >
        <ArrowIcon class="icon" :direction="widthArrowDirection" />
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
        font-weight: 700;
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
    transition: color .2s linear, fill .2s linear;
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