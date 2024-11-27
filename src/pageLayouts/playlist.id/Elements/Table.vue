<script setup lang="ts">
import type {Ref} from 'vue';
import {computed, inject, onMounted, onUnmounted, ref} from 'vue';
import MusicTableRow from '@/pageLayouts/playlist.id/Elements/MusicTableRow.vue';
import useCurrentMusicStore from '@/features/MediaPlayer/store/useCurrentMusicStore';
import useMusicUtils from "@/features/MediaPlayer/composables/useMusicUtils";
import MusicRowHeader from "@/UI/Elements/MusicRowHeader.vue";
import type {Track} from "@/services/types/Entities/Track";
import type {Playlist} from "@/services/types/Entities/Playlist";

const layoutContent = inject<Ref<HTMLElement & {content: HTMLElement}>>('layoutContent');

const layoutWidth = ref<number>(0);

const widthObserver = new ResizeObserver(([entry]) => {
  layoutWidth.value = entry.contentRect.width;
});

onMounted(() => {
  widthObserver.observe(layoutContent!.value.content);
});

onUnmounted(() => {
  widthObserver.unobserve(layoutContent!.value.content);
});

const computeTableLines = computed(() => {
  const isDate = layoutWidth.value > 750;
  const isAlbum = layoutWidth.value > 550;

  return {
    isDate,
    isAlbum
  }
});

const computeGridLines = computed(() => {
  if (!computeTableLines.value.isAlbum) {
    return `grid-template-columns:
      [index] 16px
      [main] minmax(120px, 4fr)
      [time] minmax(120px, 1fr);`
  }

  if (!computeTableLines.value.isDate) {
    return `grid-template-columns:
      [index] 16px
      [main] minmax(120px, 4fr)
      [var1] minmax(120px, 2fr)
      [time] minmax(120px, 1fr);`
  }

  return `grid-template-columns:
      [index] 16px
      [main] minmax(120px, 6fr)
      [var1] minmax(120px, 4fr)
      [var2] minmax(120px, 3fr)
      [time] minmax(120px, 1fr);`
});

defineProps<{
  format: 'Компактный'| 'Список';
  queue: Track[],
  dossier: Playlist
}>();

const currentMusicStore = useCurrentMusicStore();

const {loadSongOrPlaylist} = useMusicUtils();

</script>

<template>
  <div class="playlist_table">
    <MusicRowHeader
      :parent-element="layoutContent!.content"
      :var1="computeTableLines.isAlbum ? format === 'Список' ? 'Альбом' : 'Исполнитель' : ''"
      :var2="computeTableLines.isDate && 'Дата добавления'"
      :style="computeGridLines"
    />

    <div class="playlistTableBody">
      <MusicTableRow
        v-for="(music, index) in queue"
        :id="music.id"
        :key="music.id"
        :index="index + 1"
        :format="format"
        :name="music.name"
        :artists="music.artists"
        :album="{id: 1, name: 'Альбом'}"
        :duration="music.duration"
        :uploaded-date="music.uploadedDate"
        :is-added="false"
        :is-current="currentMusicStore.currentAudioId == music.id"
        :listenings="music.listenings"
        v-bind="computeTableLines"
        :style="computeGridLines"
        class="row"
        @set-play="loadSongOrPlaylist({
          playlistInfoDossier: dossier,
          playlistQueue: queue
        }, {index: index})"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.playlist_table {
  width: 100%;
  height: 100%;
  position: relative;

  .playlist_table_head {
    position: sticky;
    width: 100%;
    top: 64px;
    height: 36px;
    padding: 0 calc(var(--content-spacing) + 16px);
    display: grid;
    grid-gap: 16px;
    grid-template-rows: auto;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 1 !important;

    & > div {
      height: 100%;
      display: flex;
      align-items: center;
      color: var(--text-soft);
      font-size: 0.875rem;
      font-weight: 500;

      &:first-child {
        justify-self: end;
        font-size: 1rem;
      }

      & > div {
        margin-left: auto;
        margin-right: 32px;

        .icon {
          width: 16px;
          height: 16px;
          fill: var(--text-soft);
        }
      }
    }

    $classes: (
      'index' : 'index',
      'name' : 'name',
      'var1' : 'var1',
      'var2' : 'var2',
      'time' : 'time'
    );

    @each $class, $line in $classes {
      .#{$class} {
        grid-column: #{$line};
      }
    }
  }

  .playlistTableBody {
    margin-top: var(--content-spacing);
    padding: 0 calc(var(--content-spacing) + 16px);

    .row {
      margin: 0 calc(var(--content-spacing) * -1);
      padding: 0 var(--content-spacing);
    }
  }

  .stuck {
    background-color: var(--ui-highlight);
  }
}
</style>