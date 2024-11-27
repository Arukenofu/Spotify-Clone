<script setup lang="ts">
import {useRoute} from "vue-router";
import {inject, ref, watch} from "vue";
import {useQuery} from "@tanstack/vue-query";
import musicInfoService from "@/services/api/music/apiMusicService";
import setTitle from "@/shared/utils/setTitle";
import getCommaSeparatedString from "@/shared/utils/format/getCommaSeparatedString";
import HandleEntityLayoutStates from "@/UI/Elements/HandleEntityLayoutStates.vue";
import EntityInfoHeader from "@/UI/Elements/EntityInfoHeader.vue";
import PlayHeader from "@/UI/Blocks/PlayHeader.vue";
import useMusicUtils from "@/features/MediaPlayer/composables/useMusicUtils";
import EntityAvatar1x1 from "@/UI/Elements/EntityAvatar1x1.vue";
import formatTimeMMSS from "../../shared/utils/format/formatTimeMMSS";
import readableNumber from "../../shared/utils/format/readableNumber";
import GeneralGradientSectionWithControls from "@/UI/Blocks/GeneralGradientSectionWithControls.vue";
import AddToMediaLib from "@/UI/Buttons/AddToMediaLib.vue";
import ArtistFullWidthBlock from "@/UI/Blocks/ArtistFullWidthBlock.vue";
import TracksSection from "@/UI/Blocks/TracksSection.vue";
import MusicRow from "@/UI/Elements/Track/TrackRow.vue";

const route = useRoute('/track/[id]');
const layoutScrollY = inject('layoutScrollY', ref(0));

watch(() => route.params.id, () => {
  refetch();
});

const {
  data: trackInfo,
  isFetching,
  isError, 
  refetch
} = useQuery({
  queryKey: ['trackInfo', route.params.id],
  queryFn: async () => {
    const data = await musicInfoService.getTrackInfo(Number(route.params.id));

    setTitle(`${data.trackInfoDossier.name} - song by ${getCommaSeparatedString(data.trackInfoDossier.artists, 'name')} | Spotify`);

    return data;
  }
});

const {isThisMusic, isThisPlaylistAndMusic, loadPlaylist, createCustomPlaylist} = useMusicUtils();
</script>

<template>
  <div v-if="trackInfo" class="recommended-cards">
    <PlayHeader
      :title="trackInfo.trackInfoDossier.name"
      :scroll-y="layoutScrollY"
      :mask="null"
      :is-playing="isThisMusic(trackInfo.trackInfoDossier.id, true)"
      @play-click="loadPlaylist(trackInfo.trackInfoDossier.id, {
        musicId: trackInfo.trackInfoDossier.id
      })"
    />
    <EntityInfoHeader
      :image="trackInfo.trackInfoDossier.avatar"
      :mask="trackInfo.trackInfoDossier.color"
      :type="'Track'"
      class="info"
    >
      <span class="type">Трек</span>
      <h1 class="name">{{trackInfo.trackInfoDossier.name}}</h1>
      <div class="additional">
        <div v-if="trackInfo.trackInfoDossier.artists.length === 1" class="single-artist">
          <EntityAvatar1x1 class="img" type="Artist" />
          <RouterLink :to="`/artist/${trackInfo.trackInfoDossier.artists[0].id}`" class="name">
            {{trackInfo.trackInfoDossier.artists[0].name}}
          </RouterLink>
        </div>
        <div v-else class="artists">
          <template
            v-for="(artist, index) in trackInfo.trackInfoDossier.artists"
            :key="artist.id"
          >
            <RouterLink
              :to="`/artist/${artist.id}`"
              class="artist"
            >
              {{artist.name}}
            </RouterLink>

            <template v-if="index !== trackInfo.trackInfoDossier.artists.length-1">&nbsp;•&nbsp;</template>
          </template>
        </div>

        <div class="dot">•</div>

        <span>{{formatTimeMMSS(trackInfo.trackInfoDossier.duration)}}</span>

        <div class="dot">•</div>

        <span>{{readableNumber(trackInfo.trackInfoDossier.listenings)}}</span>
      </div>
    </EntityInfoHeader>

    <GeneralGradientSectionWithControls
      :is-playing="isThisMusic(trackInfo.trackInfoDossier.id, true)"
      :bg-color="trackInfo.trackInfoDossier.color"
      :tooltip-str="`Открыть контекстное меню: ${trackInfo.trackInfoDossier.name}`"
    >
      <template #main-options>
        <AddToMediaLib
          class="add"
          :state="trackInfo.trackInfoDossier.isAddedToFavorites"
        />
      </template>
    </GeneralGradientSectionWithControls>

    <div class="artists-container">
      <ArtistFullWidthBlock
        v-for="artist in trackInfo.trackInfoDossier.artists"
        :id="artist.id"
        :key="artist.id"
        :image="artist.avatar"
        :name="artist.name"
      />
    </div>

    <TracksSection class="section" naming="Рекомендации" postfix="На основе этого трека">
      <div class="wrapper">
        <MusicRow
          v-for="(music, index) of trackInfo.recommendedRelatedTracks"
          :key="music.id"
          :index="index + 1"
          :is-current="isThisPlaylistAndMusic(music.id, `related:${trackInfo.trackInfoDossier.name}`)"
          :is-playing="isThisPlaylistAndMusic(music.id, `related:${trackInfo.trackInfoDossier.name}`, true)"
          :music-id="music.id"
          :music-name="music.name"
          :duration="music.duration"
          :artists="music.artists"
          :image="music.avatar"
          :color="music.color"
          :is-added="false"
          :show-artists="false"
          class="row"
          @set-play="createCustomPlaylist(
            `related:${trackInfo.trackInfoDossier.name}`,
            trackInfo.recommendedRelatedTracks,
            index
          )"
        >
          <template #var1>
            <span class="var1">
              {{readableNumber(trackInfo.trackInfoDossier.listenings)}}
            </span>
          </template>
        </MusicRow>
      </div>
    </TracksSection>

    <TracksSection
      v-for="popular in trackInfo.popularArtistsTracks"
      :key="popular.artistName"
      class="section"
      prefix="Популярные треки исполнителя"
      :naming="popular.artistName"
    >
      <div class="wrapper">
        <MusicRow
          v-for="(music, index) of popular.trackList"
          :key="music.id"
          :index="index + 1"
          :is-current="isThisPlaylistAndMusic(music.id, `popular:${popular.artistName}`)"
          :is-playing="isThisPlaylistAndMusic(music.id, `popular:${popular.artistName}`, true)"
          :music-id="music.id"
          :music-name="music.name"
          :duration="music.duration"
          :artists="music.artists"
          :image="music.avatar"
          :color="music.color"
          :is-added="false"
          :show-artists="true"
          class="row"
          @set-play="createCustomPlaylist(
            `popular:${popular.artistName}`,
            trackInfo.recommendedRelatedTracks,
            index
          )"
        >
          <template #var1>
            <span class="var1">
              {{readableNumber(music.listenings)}}
            </span>
          </template>
        </MusicRow>
      </div>
    </TracksSection>
  </div>
  <HandleEntityLayoutStates
    :is-fetching="isFetching"
    :is-error="isError"
    entity="трек"
  />
</template>

<style scoped lang="scss">
.recommended-cards {

  .info {
    container: trackInfo / inline-size;

    &:deep(.image) {
      border-radius: 4px;
    }

    .type {
      font-weight: 500;
      font-size: .875rem;
      user-select: none;
    }

    @container trackInfo (max-width: 1000px) {
      .name {
        font-size: 3.5em !important;
      }
    }

    @container trackInfo (max-width: 700px) {
      .name {
        font-size: 2em !important;
      }
    }

    .name {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-align: left;
      user-select: none;
      font-weight: 800;
      text-wrap: nowrap;
      margin-bottom: 8px;
      line-height: 1.2;
      width: min-content;
      font-size: 6rem;
    }

    .additional {
      display: flex;
      align-items: center;
      font-size: .875rem;
      font-weight: 700;

      & > span {
        color: var(--text-soft);
      }

      .dot {
        margin: 0 4px;
        color: var(--text-soft);
      }

      .single-artist {
        display: inline-flex;
        align-items: center;
        gap: 3px;

        .img {
          width: 24px;
          height: 24px;
          border-radius: 50%;
        }

        .name {
          color: var(--white);
          font-weight: 700;

          &:hover {
            text-decoration: underline;
          }
        }
      }

      .artists {
        display: inline-flex;
        align-items: center;

        .artist {
          color: var(--white);
          font-weight: 700;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }

  .add {
    height: 32px;
    width: 32px;
    margin-right: var(--content-spacing);
  }

  .artists-container, .section {
    padding: 0 var(--content-spacing);
    margin-bottom: 40px;
  }

  .section {
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
}
</style>