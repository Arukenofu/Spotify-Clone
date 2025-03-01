<script setup lang="ts">
import AlbumInfoHeader from "@/pageLayouts/album.id/AlbumInfoHeader.vue";
import {useQuery} from "@tanstack/vue-query";
import {useRoute} from "vue-router";
import GeneralGradientSectionWithControls
  from "@/shared/UI/EntityPageElements/Sugar/GeneralGradientSectionWithControls.vue";
import useMusicUtils from "@/features/MediaPlayer/composables/useMusicUtils";
import AddToMediaLib from "@/shared/UI/Buttons/AddToMediaLib.vue";
import MusicRow from "@/shared/UI/Elements/Track/TrackRow.vue";
import PlayHeaderWithPlayingState from "@/shared/UI/EntityPageElements/Sugar/PlayHeaderWithPlayingState.vue";
import {computed, inject, type Ref, ref} from "vue";
import MusicRowHeader from "@/shared/UI/EntityPageElements/MusicRowHeader.vue";
import HandleEntityLayoutStates from "@/shared/UI/Elements/HandleEntityLayoutStates.vue";
import FormatLibraryButton from "@/shared/UI/Buttons/FormatLibraryButton.vue";
import {useMusicCollectionFormat} from "@/features/MusicCollectionFormat";
import {useI18n} from "vue-i18n";
import {sdk} from "@/services/sdk";
import type {Album, Artist} from "@spotify/web-api-ts-sdk";
import getAsyncPalette from "@/shared/utils/getAsyncPalette";
import getImageFromEntity from "@/shared/utils/getImageFromEntity";
import CommaSeparatedArtistsLink from "@/shared/components/Sugar/CommaSeparatedArtistsLink.vue";
import setTitle from "@/shared/utils/setTitle";
import getCommaSeparatedString from "@/shared/utils/format/getCommaSeparatedString";
import TrackTableWrapper from "@/shared/UI/EntityPageElements/TrackTableWrapper.vue";
import MusicRowHeaderWrapper from "@/shared/UI/EntityPageElements/MusicRowHeaderWrapper.vue";

const {t} = useI18n();

const route = useRoute('/playlist/[id]');
const scrollY = inject('layoutScrollY', ref(0));
const layout = inject<Ref<HTMLElement & {content: HTMLElement}>>('layoutContent');

const albumId = computed(() => route.params.id);

async function fetchAlbumData() {
  return sdk.albums.get(albumId.value);
}

async function fetchArtistData(artists: Artist[]) {
  if (artists.length === 1) {
    return [await sdk.artists.get(artists[0].id)];
  }

  return artists;
}

async function getMaskColor(data: Album) {
  if (!data?.images?.length) return null;

  const palette = await getAsyncPalette(data.images[0].url);
  if (!palette.Vibrant) return null;

  return palette.Vibrant.hex;
}

const {data, isFetching, isError} = useQuery({
  queryKey: ['album', albumId],
  queryFn: async () => {
    const data = await fetchAlbumData();
    const maskColor = await getMaskColor(data);
    const artists = await fetchArtistData(data.artists);

    setTitle(`${data.name} - Album by ${getCommaSeparatedString(data.artists, 'name')} | Spotify`);

    return {...data, artists, maskColor};
  },
  staleTime: Infinity
});

const {format, setFormat} = useMusicCollectionFormat();

const {isThisPlaylist, isThisPlaylistAndMusic} = useMusicUtils();
</script>

<template>
  <HandleEntityLayoutStates
    :is-fetching="isFetching"
    :is-error="isError"
    entity="album"
  >
    <div v-if="data" class="album">
      <PlayHeaderWithPlayingState
        :title="data.name"
        :scroll-y="scrollY"
        :passing-height="280"
        :is-playing="isThisPlaylist(data.id, true)"
        :mask="data.maskColor"
      />

      <AlbumInfoHeader
        :image="getImageFromEntity(data.images)"
        :mask="data.maskColor"
        :name="data.name"
        :creator="data.artists"
        :tracks-amount="data.total_tracks"
        :release-date="data.release_date"
      />

      <GeneralGradientSectionWithControls
        :is-playing="isThisPlaylist(data.id, true)"
        :bg-color="data.maskColor"
        :tooltip-str="t('music-actions.moreOptionsFor', [data.name])"
      >
        <template #main-options>
          <AddToMediaLib
            class="add"
            :state="true"
          />
        </template>
        <template #additional-options>
          <FormatLibraryButton :format @set-format="setFormat" />
        </template>
      </GeneralGradientSectionWithControls>

      <MusicRowHeaderWrapper :parent-element="layout!.content">
        <MusicRowHeader class="row-header" :class="format === 'Compact' && 'compact'">
          <template v-if="format === 'Compact'" #var1>
            {{t('entities.artist')}}
          </template>
        </MusicRowHeader>
      </MusicRowHeaderWrapper>

      <TrackTableWrapper>
        <MusicRow
          v-for="(music, index) of data.tracks.items"
          :key="music.id"
          :index="index + 1"
          :is-current="isThisPlaylistAndMusic(music.id, data.id)"
          :is-playing="isThisPlaylistAndMusic(music.id, data.id, true)"
          :music-id="music.id"
          :music-name="music.name"
          :duration="music.duration_ms / 1000"
          :artists="music.artists"
          :image="null"
          :is-added="false"
          :compact="format === 'Compact'"
          :class="format === 'Compact' && 'compact'"
          class="row"
          show-artists
          hide-image
        >
          <template v-if="format === 'Compact'" #var1>
            <CommaSeparatedArtistsLink class="artist" :artists="music.artists" />
          </template>
        </MusicRow>
      </TrackTableWrapper>
    </div>
  </HandleEntityLayoutStates>
</template>

<style scoped lang="scss">
.album {
  container: album / inline-size;

  .row:hover:deep(.artist) {
    color: var(--white) !important;
  }

  .music-row-outer {
    position: sticky;
    top: 64px;
  }

  .add {
    height: 32px;
    margin-right: var(--content-spacing);
  }

  .row-header, .row {
    display: grid;
    grid-template-columns:
        [index] 16px
        [main] minmax(120px, 4fr)
        [var1] 0
        [var2] 0
        [time] minmax(120px, 1fr);
  }

  .compact {
    grid-template-columns:
        [index] 16px
        [main] minmax(120px, 4fr)
        [var1] minmax(120px, 2fr)
        [var2] 0
        [time]minmax(120px, 1fr) !important;

    :deep(.artist) {
      color: var(--text-soft);
      font-size: .875rem;
      font-weight: 500;

      &:hover {
        color: var(--white);
      }
    }
  }

  @container album (max-width: 550px) {
    .compact {
      grid-template-columns:
        [index] 16px
        [main] minmax(120px, 4fr)
        [var1] 0
        [var2] 0
        [time] minmax(120px, 1fr) !important;

      &:deep(.var1) {
        display: none;
      }
    }
  }
}
</style>