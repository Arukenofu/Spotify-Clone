<script setup lang="ts">
import { computed, ref } from 'vue';
import {Dropdown} from "floating-vue";
import {useRoute} from "vue-router";
import MediaLibButton from '@/widgets/LayoutSideBar/UI/Button/MediaLibButton.vue';
import ScrollableBlock from '@/UI/Blocks/ScrollableBlock.vue';
import SearchPlaylist from '@/widgets/LayoutSideBar/UI/Button/SearchMedialib.vue';
import FormatButton from '@/widgets/LayoutSideBar/UI/Button/FormatButton.vue';
import FormatContextMenu from '@/widgets/LayoutSideBar/contextMenu/FormatContextMenu.vue';
import {
  useSidebarWidthStore,
  usePlaylistFormat,
  useGridWidth,
  handleIsMedialibActive,
  handleMedialibClick,
  handleMedialibSortAndSearch, useMedialibsSort
} from '@/features/MedialibSidebar';
import NoMediaLib from "@/widgets/LayoutSideBar/UI/NoMediaLib.vue";
import QueryNotFound from "@/widgets/LayoutSideBar/UI/QueryNotFound.vue";
import {useQuery} from "@tanstack/vue-query";
import apiMedialibService from "@/services/api/user/medialib/apiMedialibService";
import type {MediaLibTypes} from "@/services/api/user/medialib/types/MediaLibTypes";

const search = ref<string>('');
const { isMinimized } = useSidebarWidthStore();

const { currentComponent, getComponentName, setComponent } = usePlaylistFormat();
const { gridWidth, setGridWidth } = useGridWidth();
const { currentSort, setSort } = useMedialibsSort();

const route = useRoute();

const playlistsComputedClasses = computed(() => ({
  grid: getComponentName.value === 'Grid',
  minimized: isMinimized.value
}));

const {data: mediaLibs, isSuccess} = useQuery<MediaLibTypes[]>({
  queryKey: ['mediaLib'],
  queryFn: async () => await apiMedialibService.getMediaLib()
});

const mediaLibsFiltered = computed(() => {
  if (!mediaLibs.value || mediaLibs.value.length < 1) return [];

  return handleMedialibSortAndSearch(mediaLibs.value, {
    searchQuery: search.value,
    sortBy: currentSort.value
  });
})
</script>

<template>
  <div class="media-library">
    <MediaLibButton />

    <div v-if="!isMinimized" class="controls">
      <SearchPlaylist v-model="search" />

      <Dropdown class="container" placement="bottom" distance="4">
        <FormatButton
          :sort-name="currentSort"
          :format-component-name="getComponentName"
          class="formats"
        />

        <template #popper>
          <FormatContextMenu
            :component-name="getComponentName"
            :grid-width="gridWidth"
            :sort-name="currentSort"
            @set-component-name="setComponent"
            @set-grid-width="setGridWidth"
            @set-sort-name="setSort"
          />
        </template>
      </Dropdown>
    </div>

    <ScrollableBlock v-if="isSuccess" class="block" :gap="isMinimized ? '0px' : '7px'">
      <NoMediaLib
        v-if="!mediaLibs || mediaLibs.length === 0"
      />

      <QueryNotFound v-else-if="search && !isMinimized && !mediaLibsFiltered.length" :query="search" />

      <div v-else class="playlists" :class="playlistsComputedClasses">
        <Component
          v-bind="mediaLib"
          :is="currentComponent"
          v-for="mediaLib in mediaLibsFiltered"
          :key="mediaLib.type"
          :minimized="gridWidth < 135 || isMinimized"
          :class="handleIsMedialibActive(mediaLib.id, mediaLib.type, route) && 'active'"
          @click="handleMedialibClick(mediaLib.id, mediaLib.type, () => {})"
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

        &:hover {
          background-color: var(--ui-highlight-active) !important;
        }
      }
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(
        auto-fill,
        minmax(calc(v-bind(gridWidth) * 1px), 1fr)
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
