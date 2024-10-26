<script setup lang="ts">
import {computed, inject, ref} from "vue";
import { useRoute } from 'vue-router';
import setTitle from '@/shared/utils/setTitle';
import {useMutation, useQuery} from "@tanstack/vue-query";
import {ArtistService} from "@/services/api/artist/artistService";
import PlayHeader from "@/UI/Blocks/PlayHeader.vue";
import ArtistInfoHeader from "@/pageLayouts/artist.id/ArtistInfoHeader.vue";
import ArtistInfoHeaderNoCover from "@/pageLayouts/artist.id/ArtistInfoHeaderNoCover.vue";
import GeneralGradientSectionWithControls from "@/UI/Blocks/GeneralGradientSectionWithControls.vue";
import MusicRow from "@/UI/Elements/MusicRow.vue";
import readableNumber from "../../shared/utils/readableNumber";
import useMusicUtils from "@/features/MediaPlayer/composables/useMusicUtils";
import type {PlaylistInfoDossier} from "@/services/api/music/types/PlaylistInfo";

const route = useRoute('/artist/[id]');
const layoutScrollY = inject('layoutScrollY', ref(0));

const isExpanded = ref<boolean>(false);

// Temporarily using id parameter
setTitle(`${route.params.id} | Spotify`);

const {data: artistInfo, isFetched} = useQuery({
  queryKey: ['artistDetailed', route.params.id],
  queryFn: async () => await new ArtistService().getFullArtistInfo(Number(route.params.id))
});

const {mutate: toggleArtistSubscription} = useMutation({
  mutationFn: async () => {
    if (artistInfo.value?.isSubscribed === undefined) {
      return;
    }

    const data = await new ArtistService().toggleArtistSubscription(
        artistInfo.value.isSubscribed,
        Number(route.params.id)
    );

    if (data.message === 'OK') {
      (artistInfo.value.isSubscribed as boolean) = artistInfo.value.isSubscribed as boolean;
    }
  }
})

const popularMusic = computed(() => {
  if (!isExpanded.value) {
    return artistInfo.value?.discography.popularTracks.slice(0, 5) ?? [];
  }

  return artistInfo.value?.discography.popularTracks ?? [];
});

const {loadSongOrPlaylist, isThisPlaylist, isThisPlaylistAndMusic} = useMusicUtils();

function createCustomPlaylist(id: string, index: number) {
  const dossier: PlaylistInfoDossier = {
    id: id,
    name: '',
    imageUrl: null,
    color: null,
    description: null,
    additional: {
      tracksQuantity: 0,
      totalDuration: 0,
    },
    creator: [],
    isAdded: false
  };

  loadSongOrPlaylist({
    playlistInfoDossier: dossier,
    playlistQueue: artistInfo.value!.discography.popularTracks
  }, index);
}
</script>

<template>
  <div v-if="isFetched && artistInfo" class="layout">
    <PlayHeader
      :title="artistInfo.profile.artistName"
      :scroll-y="layoutScrollY"
      :mask="artistInfo.profile.color"
      :is-playing="isThisPlaylist(`popular:${artistInfo.profile.artistName}`, true)"
      @play-click="createCustomPlaylist(`popular:${artistInfo.profile.artistName}`, 0)"
    />
    <Component
      :is="artistInfo.profile.coverImage ? ArtistInfoHeader : ArtistInfoHeaderNoCover"
      :mask="artistInfo.profile.color"
      :name="artistInfo.profile.artistName"
      :listeners-per-month="artistInfo.listenersQuantityPerMonth"
      :image="artistInfo.profile.avatar"
      :cover-image="artistInfo.profile.coverImage"
    />
    <GeneralGradientSectionWithControls
      class="controls"
      :is-playing="isThisPlaylist(`popular:${artistInfo.profile.artistName}`, true)"
      :tooltip-str="{
        content: `Открыть контекстное меню: ${artistInfo.profile.artistName}`,
        distance: 24,
        style: {
          fontSize: '.9rem',
          padding: '6px 8px'
        }
      }"
      :bg-color="artistInfo.profile.color"
      @play-click="createCustomPlaylist(`popular:${artistInfo.profile.artistName}`, 0)"
    >
      <template #main-options>
        <button class="subscription" @click="toggleArtistSubscription()">
          {{artistInfo.isSubscribed ? 'Уже подписаны' : 'Подписаться'}}
        </button>
      </template>
    </GeneralGradientSectionWithControls>

    <section class="popular-tracks">
      <h2>Популярные треки</h2>
      <div class="wrapper">
        <MusicRow
          v-for="(music, index) of popularMusic"
          :key="music.id"
          :index="index + 1"
          :is-current="isThisPlaylistAndMusic(music.id, `popular:${artistInfo.profile.artistName}`)"
          :is-playing="isThisPlaylistAndMusic(music.id, `popular:${artistInfo.profile.artistName}`, true)"
          :music-id="music.id"
          :album-id="music.albumId"
          :music-name="music.name"
          :duration="music.duration"
          :artists="music.artists"
          :image="music.avatar"
          :color="music.color"
          :is-added="false"
          :show-artists="false"
          class="row"
          @set-play="createCustomPlaylist(
            `popular:${artistInfo.profile.artistName}`,
            index
          )"
        >
          <template #var1>
            <span class="var1">
              {{readableNumber(artistInfo.listenersQuantityPerMonth)}}
            </span>
          </template>
        </MusicRow>
      </div>
      <button class="expand" @click="isExpanded = !isExpanded">
        {{isExpanded ? 'Свернуть' : 'Ещё'}}
      </button>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  height: 10000px;
  position: relative;

  .controls {
    padding: 24px 0;

    .subscription {
      font-size: .875rem;
      font-weight: 700;
      background: transparent;
      border: 1px solid #7c7c7c;
      border-radius: 500px;
      padding: 4px 16px;
      height: 32px;
      cursor: pointer;
      margin-right: var(--content-spacing);

      &:hover {
        transform: scale(1.04);
        border: 1px solid var(--white);
      }
    }
  }

  .popular-tracks {
    padding: 0 var(--content-spacing);
    display: grid;
    grid-template-columns: 1fr;

    h2 {
      font-size: 1.5rem;
      font-weight: 700;
      font-family: var(--title-font);
      width: 100%;
      margin-bottom: 16px;
    }

    .wrapper {
      container: wrapper / inline-size;
      
      @container wrapper (max-width: 620px) {
        .row {
          grid-template-columns: [index] 16px [main] minmax(120px, 4fr) [var1] 0 [var2] 0 [time] minmax(120px, 1fr) !important;
        }

        .var1 {
          display: none;
        }
      }

      .row {
        grid-template-columns: [index] 16px [main] minmax(120px, 4fr) [var1] minmax(120px, 2fr) [var2] 0 [time] minmax(120px, 1fr);
      }

      .var1 {
        font-size: .875rem;
      }
    }

    .expand {
      width: min-content;
      padding: 16px;
      background: transparent;
      border: none;
      font-weight: 700;
      font-size: .875rem;
      color: hsla(0,0%,100%,.7);

      &:hover {
        color: var(--white);
      }
    }
  }
}
</style>
