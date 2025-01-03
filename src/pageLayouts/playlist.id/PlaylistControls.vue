<script setup lang="ts">
import {reactive} from "vue";
import GeneralGradientSectionWithControls from "@/shared/UI/Blocks/Sugar/GeneralGradientSectionWithControls.vue";
import CheckedRoundCircleIcon from "@/shared/UI/Icons/CheckedRoundCircleIcon.vue";
import RoundPlusIcon from "@/shared/UI/Icons/RoundPlusIcon.vue";
import FormatLibraryButton from "@/shared/UI/Buttons/FormatLibraryButton.vue";
import type {Playlist} from "@/services/types/Entities/Playlist";
import {useMusicCollectionFormat} from "@/features/MusicCollectionFormat";
import usePlaylistStore from "@/features/MediaPlayer/store/usePlaylistStore";
import useMusicUtils from "@/features/MediaPlayer/composables/useMusicUtils";
import type {Track} from "@/services/types/Entities/Track";
import {useI18n} from "vue-i18n";

interface Props {
  dossier: Playlist,
  queue: Track[]
}
const {dossier, queue} = defineProps<Props>();

const {t} = useI18n();

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

const {format, setFormat} = useMusicCollectionFormat();

const tooltips = reactive({
  addButton: {
    content: dossier.isAdded ? t('contextmenu-items.removeFromMedialib') : t('contextmenu-items.addToMedialib'),
    distance: 24
  },
  options: t('music-actions.moreOptionsFor', [dossier.name])
});
</script>

<template>
  <GeneralGradientSectionWithControls
    :is-playing="false"
    :tooltip-str="tooltips.options"
    :bg-color="dossier.color ?? null"
    @play-click="play()"
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