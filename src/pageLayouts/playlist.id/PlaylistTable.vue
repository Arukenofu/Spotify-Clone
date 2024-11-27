<script setup lang="ts">
import {reactive} from 'vue';
import RoundPlusIcon from '@/UI/Icons/Shared/RoundPlusIcon.vue';
import CheckedRoundCircleIcon from '@/UI/Icons/Shared/CheckedRoundCircleIcon.vue';
import FormatLibraryButton from '../../UI/Buttons/FormatLibraryButton.vue';
import Table from '@/pageLayouts/playlist.id/Elements/Table.vue';
import useCachedRef from '@/shared/composables/useCachedRef';
import useMusicUtils from "@/features/MediaPlayer/composables/useMusicUtils";
import usePlaylistStore from "@/features/MediaPlayer/store/usePlaylistStore";
import GeneralGradientSectionWithControls from "@/UI/Blocks/GeneralGradientSectionWithControls.vue";
import type {Playlist} from "@/services/types/Entities/Playlist";
import type {Track} from "@/services/types/Entities/Track";

interface Props {
  queue: Track[],
  dossier: Playlist
}

const {dossier, queue} = defineProps<Props>();

type Format = 'Компактный' | 'Список';

const format = useCachedRef<Format>('playlistFormat', 'Список', {
  expectedTypes: ['string'],
  expectedValues: ['Компактный', 'Список']
});

const playlistStore = usePlaylistStore();

const {
  loadSongOrPlaylist,
  toggleTrackPlaying,
  isThisPlaylist
} = useMusicUtils();

function play() {
  if (isThisPlaylist(playlistStore.currentPlaylistInfo?.id ?? null)) {
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
    content: dossier.isAdded ? 'Удалить из медиатеки' : 'Добавить в медиатеку',
    distance: 24
  },
  options: `Открыть контекстное меню: ${dossier.name}`
});
</script>

<template>
  <GeneralGradientSectionWithControls 
    :is-playing="isThisPlaylist(
      playlistStore.currentPlaylistInfo?.id ?? null,
      true
    )"
    :tooltip-str="tooltips.options"
    :bg-color="dossier.color ?? null"
    @play-click="play"
  >
    <template #main-options>
      <button v-tooltip="tooltips.addButton" class="state">
        <CheckedRoundCircleIcon v-if="dossier.isAdded" class="remove" />
        <RoundPlusIcon v-else class="add" />
      </button>
    </template>

    <template #additional-options>
      <FormatLibraryButton :format @set-format="setFormat" />
    </template>
  </GeneralGradientSectionWithControls>

  <Table :format="format" :queue="queue" :dossier="dossier" />
</template>

<style scoped lang="scss">
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
</style>