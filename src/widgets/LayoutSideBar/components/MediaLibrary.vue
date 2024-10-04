<script setup lang="ts">
import { computed, ref } from 'vue';
import MediaLibButton from '@/widgets/LayoutSideBar/UI/Button/MediaLibButton.vue';
import ScrollableBlock from '@/UI/Blocks/ScrollableBlock.vue';
import SearchPlaylist from '@/widgets/LayoutSideBar/UI/Button/SearchPlaylist.vue';
import FormatButton from '@/widgets/LayoutSideBar/UI/Button/FormatButton.vue';
import FormatContextMenu from '@/widgets/LayoutSideBar/contextMenu/formatContextMenu.vue';
import {
  gridColumnWidth,
  usePlaylistFormat,
  useSidebarWidthStore
} from '@/features/FormatSidebarPlaylist';
import { showContextMenu } from '@/features/ContextMenu';
import type { FormatProps } from '@/features/FormatSidebarPlaylist';

const search = ref<string>('');

const { isMinimized } = useSidebarWidthStore();

const { currentComponent, getComponentName } = usePlaylistFormat();

const props: FormatProps = {
  id: 1,
  to: '12',
  name: 'baur',
  owner: 'baur',
  type: 'Плейлист'
};

const { getCurrentWidth } = gridColumnWidth();

const playlistsComputedClasses = computed(() => {
  return {
    grid: getComponentName.value === 'Grid',
    minimized: isMinimized.value
  };
});

const gridItemWidth = computed(() => {
  return `${getCurrentWidth.value}px`;
});
</script>

<template>
  <div class="media-library">
    <MediaLibButton />

    <ScrollableBlock class="block" :gap="isMinimized ? '0px' : '7px'">
      <div class="controls" v-if="!isMinimized">
        <SearchPlaylist v-model="search" />

        <FormatButton
          @click="
            showContextMenu($event, FormatContextMenu, {
              design: 'minimal',
              stickOn: 'mousePosition'
            })
          "
        />
      </div>

      <div class="playlists" :class="playlistsComputedClasses">
        <Component
          v-bind="props"
          :is="currentComponent"
          :minimized="getCurrentWidth < 135 || isMinimized"
          v-for="a in 12"
          :key="a"
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

  .block {
    flex: 1;
    border-bottom-right-radius: var(--border-radius);
    border-bottom-left-radius: var(--border-radius);
    height: auto;

    .controls {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
      padding: 0 var(--medialib-padding-x);
      margin-bottom: 9px;
    }

    .playlists {
      padding: 0 var(--medialib-padding-x) 21px;
      height: 100%;

      &:deep(a) {
        &:hover {
          background-color: var(--ui-highlight);
        }

        &:active {
          background-color: var(--black);
        }
      }

      .router-link-active {
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
        minmax(v-bind('gridItemWidth'), 1fr)
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
