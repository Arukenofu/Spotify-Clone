<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { Tippy } from 'vue-tippy'
import { useSidebarWidth } from '@/features/MedialibSidebar/composables/useSidebarWidth.ts'
import RoundButton from '@/shared/UI/Buttons/RoundButton.vue'
import ArrowIcon from '@/shared/UI/Icons/ArrowIcon.vue'
import LibraryIcon from '@/shared/UI/Icons/LibraryIcon.vue'
import PlusIcon from '@/shared/UI/Icons/PlusIcon.vue'
import CreatePlaylistContextMenu from '@/widgets/LayoutSideBar/contextMenu/CreatePlaylistContextMenu.vue'

const { t } = useI18n()

const sidebar = reactive(useSidebarWidth())

function toggleSidebar() {
  if (sidebar.isMinimized) {
    sidebar.width = sidebar.defaultWidth
  }
  else {
    sidebar.width = 72
  }
}

const widthArrowDirection = computed(() => {
  if (sidebar.width <= sidebar.defaultWidth) {
    return 'right'
  }
  else {
    return 'left'
  }
})

function toggleWidth() {
  if (widthArrowDirection.value === 'left') {
    sidebar.width = sidebar.defaultWidth
  }
  else {
    sidebar.width = sidebar.maximalWidth
  }
}

const tooltip = computed(() => {
  const placement: 'right' | 'top' = sidebar.isMinimized ? 'right' : 'top'
  const content = sidebar.isMinimized ? t('medialib.open') : t('medialib.close')

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
        <LibraryIcon :state="!sidebar.isMinimized" class="icon" />

        <span
          v-if="!sidebar.isMinimized"
          class="added-at"
        >
          {{ t('medialib.myMedialib') }}
        </span>
      </button>
    </Tippy>

    <div
      v-if="!sidebar.isMinimized"
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
