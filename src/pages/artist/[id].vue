<script setup lang="ts">
import {computed, inject, ref, watch} from "vue";
import { useRoute } from 'vue-router';
import {useMutation, useQuery} from "@tanstack/vue-query";
import {ArtistService} from "@/services/api/artist/artistService";
import PlayHeader from "@/UI/Blocks/PlayHeader.vue";
import ArtistInfoHeader from "@/pageLayouts/artist.id/ArtistInfoHeader.vue";
import ArtistInfoHeaderNoCover from "@/pageLayouts/artist.id/ArtistInfoHeaderNoCover.vue";
import GeneralGradientSectionWithControls from "@/UI/Blocks/GeneralGradientSectionWithControls.vue";
import MusicRow from "@/UI/Elements/MusicRow.vue";
import EntityAvatar1x1 from "@/UI/Elements/EntityAvatar1x1.vue";
import EntitiesSection from "@/UI/Blocks/EntitiesSection.vue";
import MusicCard from "@/UI/Elements/MusicCard.vue";
import ArtistInfoModal from "@/pageLayouts/artist.id/ArtistInfoModal.vue";
import useMusicUtils from "@/features/MediaPlayer/composables/useMusicUtils";
import setTitle from '@/shared/utils/setTitle';
import readableNumber from "@/shared/utils/format/readableNumber";
import getDeclention from "@/shared/utils/getDeclention";
import TracksSection from "@/UI/Blocks/TracksSection.vue";
import HandleEntityLayoutStates from "@/UI/Elements/HandleEntityLayoutStates.vue";

const route = useRoute('/artist/[id]');
const layoutScrollY = inject('layoutScrollY', ref(0));

const isExpanded = ref<boolean>(false);

watch(() => route.params.id, () => {
  refetch();
})

const {data: artistInfo, isFetched, isFetching, isError, refetch} = useQuery({
  queryKey: ['artistDetailed', route.params.id],
  queryFn: async () => {
    const data = await new ArtistService().getFullArtistInfo(Number(route.params.id));

    setTitle(`${data.profile.artistName} | Spotify`);
    
    return data;
  }
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
});

const popularMusic = computed(() => {
  if (!isExpanded.value) {
    return artistInfo.value?.discography.popularTracks.slice(0, 5) ?? [];
  }

  return artistInfo.value?.discography.popularTracks ?? [];
});

const {
  loadPlaylist,
  isThisPlaylist,
  isThisPlaylistAndMusic,
  createCustomPlaylist
} = useMusicUtils();

const isModal = ref<boolean>(false);
</script>

<template>
  <HandleEntityLayoutStates
    :is-fetching="isFetching"
    :is-error="isError"
    entity="трек"
  />

  <div v-if="artistInfo" class="layout">
    <PlayHeader
      :title="artistInfo.profile.artistName"
      :scroll-y="layoutScrollY"
      :mask="artistInfo.profile.color"
      :is-playing="isThisPlaylist(`popular:${artistInfo.profile.artistName}`, true)"
      @play-click="createCustomPlaylist(
        `popular:${artistInfo.profile.artistName}`, artistInfo.discography.popularTracks, 0
      )"
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
      @play-click="createCustomPlaylist(`popular:${artistInfo.profile.artistName}`, artistInfo.discography.popularTracks, 0)"
    >
      <template #main-options>
        <button class="subscription" @click="toggleArtistSubscription()">
          {{artistInfo.isSubscribed ? 'Уже подписаны' : 'Подписаться'}}
        </button>
      </template>
    </GeneralGradientSectionWithControls>

    <TracksSection
      v-model:is-expanded="isExpanded"
      class="popular-tracks"
      naming="Популярные треки"
    >
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
            `popular:${artistInfo.profile.artistName}`, artistInfo.discography.popularTracks, 0
          )"
        >
          <template #var1>
            <span class="var1">
              {{readableNumber(artistInfo.listenersQuantityPerMonth)}}
            </span>
          </template>
        </MusicRow>
      </div>
    </TracksSection>

    <EntitiesSection
      class="albums"
      naming="Музыка"
      :href="`/artist/${artistInfo.id}/discography`"
      column-width="180px"
    >
      <MusicCard
        v-for="album in artistInfo.discography.albums"
        :id="album.id"
        :key="album.id"
        :image="album.image"
        :type="'Album'"
        :name="album.name"
        :color="album.color"
        :state="isThisPlaylist(album.id, true)"
        @on-play-click="loadPlaylist(album.id)"
      >
        {{album.info.uploadedDate}}
      </MusicCard>
    </EntitiesSection>

    <EntitiesSection
      v-for="section in artistInfo.discography.recommended"
      :key="section.sectionId"
      :naming="section.naming"
      :href="`/artist/${artistInfo.id}/recommended`"
      :column-width="'180px'"
      class="recommended"
    >
      <MusicCard
        v-for="item in section.list"
        :id="item.id"
        :key="item.id"
        :image="item.imageUrl"
        :type="'Playlist'"
        :name="item.name"
        :color="item.color"
        :state="isThisPlaylist(item.id, true)"
        @on-play-click="loadPlaylist(item.id)"
      >
        {{item.description}}
      </MusicCard>
    </EntitiesSection>

    <section class="about-artist" @click="isModal = true">
      <h2>Об исполнителе</h2>
      <div class="card">
        <EntityAvatar1x1 class="image" :image="artistInfo.profile.avatar" type="Artist" />

        <span class="listeners">
          {{ getDeclention(artistInfo.listenersQuantityPerMonth, 'слушатель', 'слушателя', 'слушателей', 'readable') }}
          в месяц
        </span>

        <div class="description">
          {{ artistInfo.profile.description }}
        </div>
      </div>
    </section>
  </div>

  <ArtistInfoModal
    v-if="artistInfo && isFetched"
    v-model="isModal"
    :subscriptions="artistInfo.subscriptionsTotalQuantity"
    :listeners="artistInfo.listenersQuantityPerMonth"
    :city-playback-data="artistInfo.cityPlaybackData"
    :description="artistInfo.profile.description"
  />
</template>

<style lang="scss" scoped>
.layout {
  height: auto;
  position: relative;
  margin-bottom: 21px;

  .controls {
    padding: 6px 0;

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

  }

  .albums, .recommended {
    padding: 0 var(--content-spacing);
  }

  .about-artist {
    margin-top: 21px;
    padding: 0 var(--content-spacing);
    width: 100%;
    max-width: 880px;

    h2 {
      font-size: 1.5rem;
      font-weight: 700;
      font-family: var(--title-font);
      margin-bottom: 16px;
    }

    .card { 
      background-color: #282828;
      padding: 40px;
      border-radius: 8px;
      transition: scale .25s linear;

      &:hover {
        scale: 1.01;
      }

      .image {
        width: 204px;
        height: 204px;
        border-radius: 50%;
        margin-bottom: 24px;
      }

      .listeners {
        font-size: 1rem;
        font-weight: 700;
        margin-bottom: 8px;
        display: block;
      }

      .description {
        max-width: 673px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
        margin-top: 8px;
        overflow: hidden;
        font-weight: 400;
        line-height: 1.5;
      }
    } 
  } 
}

</style>
