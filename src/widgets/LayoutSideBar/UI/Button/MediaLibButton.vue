<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Tippy } from 'vue-tippy'
import { useSidebarWidthStore } from '@/features/MedialibSidebar'
import RoundButton from '@/shared/UI/Buttons/RoundButton.vue'
import ArrowIcon from '@/shared/UI/Icons/ArrowIcon.vue'
import LibraryIcon from '@/shared/UI/Icons/LibraryIcon.vue'
import PlusIcon from '@/shared/UI/Icons/PlusIcon.vue'
import { defaultWidth, maximalWidth } from '@/widgets/LayoutSideBar/constants/layoutWidth'
import CreatePlaylistContextMenu from '@/widgets/LayoutSideBar/contextMenu/CreatePlaylistContextMenu.vue'

const { t } = useI18n()

const { isMinimized, currentWidth } = useSidebarWidthStore()

function toggleSidebar() {
  if (isMinimized.value) {
    currentWidth.value = defaultWidth.value
  }
  else {
    currentWidth.value = 72
  }
}

const widthArrowDirection = computed(() => {
  if (currentWidth.value <= defaultWidth.value) {
    return 'right'
  }
  else {
    return 'left'
  }
})

function toggleWidth() {
  if (widthArrowDirection.value === 'left') {
    currentWidth.value = defaultWidth.value
  }
  else {
    currentWidth.value = maximalWidth.value
  }
}

const tooltip = computed(() => {
  const placement: 'right' | 'top' = isMinimized.value ? 'right' : 'top'
  const content = isMinimized.value ? t('medialib.open') : t('medialib.close')

  return {
    content,
    placement,
  }
})
</script>

<template>
  <div class="medialib">
    <Tippy :content="tooltip.content" :placement="tooltip.placement">
      <button
        class="toggle"
        @click="toggleSidebar()"
      >
        <LibraryIcon :state="!isMinimized" class="icon" />

        <span
          v-if="!isMinimized"
          class="added-at"
        >
          {{ t('medialib.myMedialib') }}
        </span>
      </button>
    </Tippy>

    <div
      v-if="!isMinimized"
      class="other-controls"
    >
      <Tippy
        :content="t('medialib.createPlaylistOrFolder')"
        theme="context"
        trigger="click"
        placement="bottom-end"
        interactive
      >
        <RoundButton
          class="createPlaylist"
        >
          <PlusIcon class="icon" />
        </RoundButton>

        <template #content="{ hide }">
          <CreatePlaylistContextMenu @click="hide()" />
        </template>
      </Tippy>

      <Tippy :content="widthArrowDirection === 'right' ? t('medialib.showMore') : t('medialib.showLess')">
        <RoundButton
          class="toggleWidth"
          @click="toggleWidth()"
        >
          <ArrowIcon
            class="icon"
            :direction="widthArrowDirection"
          />
        </RoundButton>
      </Tippy>
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

    .added-at {
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
    .added-at {
      color: var(--white);
    }
  }
}
</style>
