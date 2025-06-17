<script setup lang="ts">
import type { MediaLibTypes } from '@/services/api/medialib/types/MediaLibTypes'
import type { EntityActionContextMenuProps } from '@/widgets/LayoutSideBar/types/EntityActionContextMenuProps'
import { useQuery } from '@tanstack/vue-query'
import { computed, defineComponent, h, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useTippy } from 'vue-tippy'
import { ContextMenu } from '@/features/ContextMenu'
import {
  handleIsMedialibActive,
  handleMedialibClick,
  handleMedialibSortAndSearch,
  type MediaLibEntityProps,
  type SortOption,
  useGridWidth,
  useMedialibFormat,
  useMedialibSort,
} from '@/features/MedialibSidebar'
import { useSidebarWidth } from '@/features/MedialibSidebar/composables/useSidebarWidth.ts'
import apiMedialibService from '@/services/api/medialib/apiMedialibService'
import ScrollableBlock from '@/shared/UI/Blocks/ScrollableBlock.vue'
import EntityAction from '@/widgets/LayoutSideBar/contextMenu/EntityAction.vue'
import FormatContextMenu from '@/widgets/LayoutSideBar/contextMenu/FormatContextMenu.vue'
import FormatButton from '@/widgets/LayoutSideBar/UI/Button/FormatButton.vue'
import MediaLibButton from '@/widgets/LayoutSideBar/UI/Button/MediaLibButton.vue'
import SearchPlaylist from '@/widgets/LayoutSideBar/UI/Button/SearchMedialib.vue'
import NoMediaLib from '@/widgets/LayoutSideBar/UI/NoMediaLib.vue'
import QueryNotFound from '@/widgets/LayoutSideBar/UI/QueryNotFound.vue'

const { t } = useI18n()

const search = ref<string>('')
const sidebar = reactive(useSidebarWidth())

const medialibFormat = reactive(useMedialibFormat())
const grid = reactive(useGridWidth())
const sort = reactive(useMedialibSort())

const route = useRoute()

const playlistsComputedClasses = computed(() => ({
  grid: medialibFormat.name === 'Grid',
  minimized: sidebar.isMinimized,
}))

const { data: mediaLibs, isSuccess } = useQuery<MediaLibTypes[]>({
  queryKey: ['mediaLib'],
  queryFn: async () => await apiMedialibService.getMediaLib(),
})

const mediaLibsFiltered = computed(() => {
  if (!mediaLibs.value || mediaLibs.value.length < 1)
    return []

  return handleMedialibSortAndSearch(mediaLibs.value, {
    searchQuery: search.value,
    sortBy: sort.name,
  })
})

const contextMenuProps = ref<EntityActionContextMenuProps | null>(null)

const { setProps, show, hide } = useTippy(() => document.body, {
  content: defineComponent(() => {
    return () => contextMenuProps.value && h(EntityAction, {
      ...contextMenuProps.value,
      onClick: hide,
    })
  }),
  offset: [1, 1],
  trigger: 'manual',
  placement: 'bottom-start',
  theme: 'context',
  interactive: true,
})

function onContextMenu(event: MouseEvent, props: MediaLibEntityProps) {
  contextMenuProps.value = props

  setProps({
    getReferenceClientRect: () => ({
      width: 0,
      height: 0,
      top: event.clientY,
      bottom: event.clientY,
      left: event.clientX,
      right: event.clientX,
    }),
  })

  show()
}
</script>

<template>
  <div class="media-library">
    <MediaLibButton />

    <div v-if="!sidebar.isMinimized" class="controls">
      <SearchPlaylist v-model="search" />

      <ContextMenu
        trigger="click"
        placement="bottom-end"
        class="container"
      >
        <FormatButton
          :sort-name="t(`medialib.sorts.${sort.name.toLowerCase()}`) as SortOption"
          :format-component-name="medialibFormat.name"
          class="formats"
        />

        <template #menu>
          <FormatContextMenu
            :component-name="medialibFormat.name"
            :grid-width="grid.width"
            :sort-name="sort.name"
            @set-component-name="medialibFormat.setComponent"
            @set-grid-width="grid.setGridWidth"
            @set-sort-name="sort.setSort"
          />
        </template>
      </ContextMenu>
    </div>

    <ScrollableBlock
      v-if="isSuccess"
      class="block"
      :content-padding="sidebar.isMinimized ? '0' : '0 8px'"
    >
      <NoMediaLib v-if="!mediaLibs || mediaLibs.length === 0" />

      <QueryNotFound v-else-if="search && !sidebar.isMinimized && !mediaLibsFiltered.length" :query="search" />

      <div v-else class="playlists" :class="playlistsComputedClasses">
        <Component
          v-bind="mediaLib"
          :is="medialibFormat.component"
          v-for="mediaLib in mediaLibsFiltered"
          :key="mediaLib.id"
          :minimized="grid.width < 135 || sidebar.isMinimized"
          :class="handleIsMedialibActive(mediaLib.id, mediaLib.type, route) && 'active'"
          @click="handleMedialibClick(mediaLib.id, mediaLib.type, () => {})"
          @contextmenu.prevent="onContextMenu($event, mediaLib)"
        />
      </div>
    </ScrollableBlock>
  </div>
</template>

<style lang="scss" scoped>
.media-library {
  flex: 1;
  background-color: var(--ui);
  border-radius: var(--border-radius);
  --medialib-padding-x: 16px;
  display: flex;
  flex-direction: column;
  max-height: 100%;

  .controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
    margin-bottom: 8px;
    padding: 0 var(--medialib-padding-x);
    overflow-x: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }

    .container {
      display: flex;
      align-items: center;
    }

    .formats {
      transition: all .2s ease;
    }
  }

  .block {
    flex: 1;
    border-bottom-right-radius: var(--border-radius);
    border-bottom-left-radius: var(--border-radius);
    height: auto;

    .playlists {
      padding: 0 0 21px;
      height: 100%;

      .active {
        background-color: var(--ui-highlight);

        &:after {
          inset: 0;
          background: none;
        }

        &:hover::after, &:hover {
          background-color: hsla(0,0%,100%,.14);
        }
      }
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(
        auto-fill,
        minmax(calc(v-bind('grid.width') * 1px), 1fr)
      );
      grid-auto-rows: min-content;
    }

    .minimized {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(auto-fill, 1fr);
      padding: 0 4px;

      &:deep(a) {
        padding: 8px;
      }
    }
  }
}
</style>
