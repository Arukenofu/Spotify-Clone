<script setup lang="ts">
import AlbumInfoHeader from "@/pageLayouts/album.id/AlbumInfoHeader.vue";
import {useQuery} from "@tanstack/vue-query";
import {useRoute} from "vue-router";
import musicInfoService from "@/services/api/music/apiMusicService";
import setTitle from "@/shared/utils/setTitle";
import getCommaSeparatedString from "@/shared/utils/format/getCommaSeparatedString";
import GeneralGradientSectionWithControls from "@/UI/Blocks/GeneralGradientSectionWithControls.vue";
import useMusicUtils from "@/features/MediaPlayer/composables/useMusicUtils";
import AddToMediaLib from "@/UI/Buttons/AddToMediaLib.vue";
import MusicRow from "@/UI/Elements/MusicRow.vue";
import PlayHeader from "@/UI/Blocks/PlayHeader.vue";
import {inject, type Ref, ref, watch} from "vue";
import MusicRowHeader from "@/UI/Elements/MusicRowHeader.vue";
import HandleEntityLayoutStates from "@/UI/Elements/HandleEntityLayoutStates.vue";
import useCachedRef from "@/shared/composables/useCachedRef";
import FormatLibraryButton from "@/UI/Buttons/FormatLibraryButton.vue";

const route = useRoute('/playlist/[id]');
const scrollY = inject('layoutScrollY', ref(0));
const layout = inject<Ref<HTMLElement & {content: HTMLElement}>>('layoutContent');

watch(() => route.params.id, () => {
  refetch();
});

const {data, isFetching, isError, refetch} = useQuery({
  queryKey: ['playlistInfo', route.params.id],
  queryFn: async () => {
    const data = await musicInfoService.getPlaylistInfo(Number(route.params.id));

    setTitle(`${data.playlistInfoDossier.name} - Album by ${getCommaSeparatedString(data.playlistInfoDossier.creators, 'name')} | Spotify`);

    return data;
  }
});

type Format = 'Компактный'| 'Список';

const format = useCachedRef<Format>('playlistFormat', 'Список', {
  expectedTypes: ['string'],
  expectedValues: ['Компактный', 'Список']
});

const {isThisPlaylist, isThisPlaylistAndMusic, loadPlaylist, loadSongOrPlaylist} = useMusicUtils();
</script>

<template>
  <HandleEntityLayoutStates
    :is-fetching="isFetching"
    :is-error="isError"
    entity="альбом"
  />

  <div v-if="data" class="layout">
    <PlayHeader
      :title="data.playlistInfoDossier.name"
      :scroll-y="scrollY"
      :is-playing="isThisPlaylist(data.playlistInfoDossier.id, true)"
      :mask="data.playlistInfoDossier.color"
    />

    <AlbumInfoHeader
      :image="data.playlistInfoDossier.image"
      :mask="data.playlistInfoDossier.color"
      :name="data.playlistInfoDossier.name"
      :creator="data.playlistInfoDossier.creators"
      :tracks-amount="data.playlistInfoDossier.info.tracksAmount"
      :total-duration="data.playlistInfoDossier.info.totalDuration"
    />
    <GeneralGradientSectionWithControls
      :is-playing="isThisPlaylist(data.playlistInfoDossier.id, true)"
      :bg-color="data.playlistInfoDossier.color"
      :tooltip-str="`Открыть контекстное меню: ${data.playlistInfoDossier.name}`"
      @play-click="loadPlaylist(data.playlistInfoDossier.id, {
        playlist: data
      })"
    >
      <template #main-options>
        <AddToMediaLib
          class="add"
          :state="true"
        />
      </template>
      <template #additional-options>
        <FormatLibraryButton :format @set-format="(newValue: Format) => format = newValue" />
      </template>
    </GeneralGradientSectionWithControls>

    <MusicRowHeader class="row-header" :parent-element="layout!.content" />

    <div class="wrapper">
      <MusicRow
        v-for="(music, index) of data.playlistQueue"
        :key="music.id"
        :index="index + 1"
        :is-current="isThisPlaylistAndMusic(music.id, data.playlistInfoDossier.id)"
        :is-playing="isThisPlaylistAndMusic(music.id, data.playlistInfoDossier.id, true)"
        :music-id="music.id"
        :music-name="music.name"
        :duration="music.duration"
        :artists="music.artists"
        :image="music.avatar"
        :color="music.color"
        :is-added="false"
        :show-artists="true"
        class="row"
        @set-play="loadSongOrPlaylist(data)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout {

  .add {
    height: 32px;
    margin-right: var(--content-spacing);
  }

  .row-header, .wrapper .row {
    display: grid;
    grid-template-columns: [index] 16px [main] minmax(120px, 4fr) [var1] 0 [var2] 0 [time] minmax(120px, 1fr);
  }

  .wrapper {
    margin-top: var(--content-spacing);
    padding: 0 var(--content-spacing);
  }
}
</style>