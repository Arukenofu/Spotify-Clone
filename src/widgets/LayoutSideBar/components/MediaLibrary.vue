<script setup lang="ts">
import { computed, ref } from 'vue';
import MediaLibButton from '@/widgets/LayoutSideBar/UI/Button/MediaLibButton.vue';
import ScrollableBlock from '@/UI/Blocks/ScrollableBlock.vue';
import SearchPlaylist from '@/widgets/LayoutSideBar/UI/Button/SearchPlaylist.vue';
import FormatButton from '@/widgets/LayoutSideBar/UI/Button/FormatButton.vue';
import FormatContextMenu from '@/widgets/LayoutSideBar/contextMenu/FormatContextMenu.vue';
import {useSidebarWidthStore, usePlaylistFormat, useGridWidth} from '@/features/MedialibSidebar';
import {Dropdown} from "floating-vue";
import NoMediaLib from "@/widgets/LayoutSideBar/UI/NoMediaLib.vue";
import QueryNotFound from "@/widgets/LayoutSideBar/UI/QueryNotFound.vue";
import {useQuery} from "@tanstack/vue-query";
import apiMedialibService from "@/services/api/user/medialib/apiMedialibService";
import type {MediaLibTypes} from "@/services/api/user/medialib/types/MediaLibTypes";
import routerPushPrevent from "@/shared/utils/routerPushPrevent";
import {useRoute} from "vue-router";

const search = ref<string>('');
const { isMinimized } = useSidebarWidthStore();
const { currentComponent, getComponentName, setComponent } = usePlaylistFormat();
const { gridWidth, setGridWidth } = useGridWidth();

const route = useRoute();

const playlistsComputedClasses = computed(() => {
  return {
    grid: getComponentName.value === 'Grid',
    minimized: isMinimized.value
  };
});

const gridItemWidth = computed(() => {
  return `${gridWidth.value}px`;
});

const {data: mediaLibs, isSuccess} = useQuery({
  queryKey: ['mediaLib'],
  queryFn: async () => await apiMedialibService.getMediaLib()
});

async function handleMedialibClick(id: string | number, type: MediaLibTypes['type']) {
  if (type === 'Folder') {
    return;
  }
  if (type === 'Collection') {
    await routerPushPrevent(`/${type}`); return;
  }

  await routerPushPrevent(`/${type}/${id}`);
}

function handleIsMedialibActive(id: string | number, type: MediaLibTypes['type']) {
  if (type === 'Collection') {
    return route.path === '/collection';
  }

  return route.path === `/${type}/${id}`.toLowerCase();
}
</script>

<template>
  <div class="media-library">
    <MediaLibButton />

    <div v-if="!isMinimized" class="controls">
      <SearchPlaylist v-model="search" />

      <Dropdown class="container" placement="bottom" distance="4">
        <FormatButton class="formats" />

        <template #popper>
          <FormatContextMenu
            :component-name="getComponentName"
            :grid-width="gridWidth"
            @set-component-name="setComponent"
            @set-grid-width="setGridWidth"
          />
        </template>
      </Dropdown>
    </div>

    <ScrollableBlock v-if="isSuccess" class="block" :gap="isMinimized ? '0px' : '7px'">
      <QueryNotFound v-if="search && !isMinimized" :query="search" />

      <NoMediaLib
        v-else-if="!mediaLibs || mediaLibs.length === 0"
      />

      <div v-else class="playlists" :class="playlistsComputedClasses">
        <Component
          v-bind="mediaLib"
          :is="currentComponent"
          v-for="mediaLib in mediaLibs"
          :key="mediaLib.type"
          :minimized="gridWidth < 135 || isMinimized"
          :class="handleIsMedialibActive(mediaLib.id, mediaLib.type) && 'active'"
          @click="handleMedialibClick(mediaLib.id, mediaLib.type)"
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
        minmax(v-bind(gridItemWidth), 1fr)
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
