<script setup lang="ts">
import GreenPlayingButton from '@/UI/Buttons/GreenPlayingButton.vue';
import RoundPlusIcon from '@/UI/Icons/Shared/RoundPlusIcon.vue';
import CheckedRoundCircleIcon from '@/UI/Icons/Shared/CheckedRoundCircleIcon.vue';
import ThreeDots from '@/UI/Icons/Shared/ThreeDots.vue';
import FormatLibraryButton from './Elements/FormatLibraryButton.vue';
import useCachedRef from '@/shared/composables/useCachedRef';
import Table from '@/pageLayouts/playlist.id/Elements/Table.vue';
import { reactive } from 'vue';
import type {PlaylistInfoDossier, PlaylistInfoQueue} from "@/services/api/music/types/PlaylistInfo";
import useMusicUtils from "@/features/MediaPlayer/composables/useMusicUtils";
import useMusicStore from "@/features/MediaPlayer/store/useMusicStore";
import usePlaylistStore from "@/features/MediaPlayer/store/usePlaylistStore";

interface Props {
  queue: PlaylistInfoQueue[],
  dossier: PlaylistInfoDossier
}

const {dossier, queue} = defineProps<Props>();

type Format = 'Компактный'| 'Список';

const format = useCachedRef<Format>('playlistFormat', 'Список', {
  expectedTypes: ['string'],
  expectedValues: ['Компактный', 'Список']
});

const {loadSongOrPlaylist, toggleTrackPlaying} = useMusicUtils();
const musicStore = useMusicStore();
const playlistStore = usePlaylistStore();

function play() {
  if (dossier.playlistId === playlistStore.currentPlaylistInfo?.playlistId) {
    toggleTrackPlaying(); return;
  }

  loadSongOrPlaylist({
    playlistInfoDossier: dossier,
    playlistQueue: queue
  });
}

function setFormat(newValue: Format) {
  format.value = newValue;
}

const tooltips = reactive({
  addButton: {
    content: true ? 'Удалить из медиатеки' : 'Добавить в медиатеку',
    distance: 24
  },
  options: 'Открыть контекстное меню: {Название}'
});
</script>

<template>
  <div class="playlist_general">
    <div class="background" />

    <div class="controls">
      <GreenPlayingButton
        class="playingButton"
        :state="musicStore.isPlaying"
        @click="play"
      />
      <button v-tooltip="tooltips.addButton" class="state">
        <CheckedRoundCircleIcon v-if="true" class="remove" />
        <RoundPlusIcon v-else class="add" />
      </button>
      <button
        v-tooltip="tooltips.options"
        class="options"
      >
        <ThreeDots class="icon" />
      </button>
      <FormatLibraryButton :format @set-format="setFormat" />
    </div>

    <Table
      :format="format"
      :queue="queue"
      :dossier="dossier"
    />
  </div>
</template>

<style scoped lang="scss">
.playlist_general {
  position: relative;

  .controls {
    width: 100%;
    height: 56px;
    padding: var(--content-spacing);
    box-sizing: content-box;
    display: flex;
    align-items: center;

    .playingButton {
      height: 100%;
      width: auto;
      aspect-ratio: 1/1;
      margin-right: calc(var(--content-spacing) + 8px);
      box-shadow: none;
    }

    .state {
      width: 32px;
      height: 32px;
      cursor: pointer;
      background: none;
      border: none;
      margin-right: var(--content-spacing);

      .add {
        fill: var(--text-soft);

        &:hover {
          fill: var(--white);
          scale: 1.05;
        }
      }

      .remove {
        fill: var(--main-color);

        &:hover {
          scale: 1.05;
        }
      }
    }

    .options {
      width: 32px;
      height: 32px;
      margin-right: var(--content-spacing);
      background: none;
      border: none;
      cursor: pointer;

      .icon {
        fill: var(--text-soft);

        &:hover {
          fill: var(--white);
          scale: 1.05;
        }
      }
    }
  }

  .background {
    top: 0;
    position: absolute;
    background-color: var(--bg-mask);
    background-image: linear-gradient(rgba(0,0,0,.6) 0, var(--ui) 100%),var(--background-noise);
    height: 232px;
    width: 100%;
    z-index: -1;
  }
}
</style>