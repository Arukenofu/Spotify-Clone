<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { computed, inject, reactive, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { currentPlaybackStore, setCurrentPlayback, useAudioStream, usePlaybackStates } from '@/features/MediaPlayer'
import { loadNextPlayback } from '@/features/MediaPlayer/utils/loadNextPlayback'
import { userPreferencesStore } from '@/features/UserPreferences'
import AlbumInfoHeader from '@/pageLayouts/album.id/AlbumInfoHeader.vue'
import { fetchAlbum } from '@/services/sdk/entities/album'
import CommaSeparatedArtistsLink from '@/shared/components/Sugar/CommaSeparatedArtistsLink.vue'
import AddToMediaLib from '@/shared/UI/Buttons/AddToMediaLib.vue'
import FormatLibraryButton from '@/shared/UI/Buttons/FormatLibraryButton.vue'
import HandleEntityLayoutStates from '@/shared/UI/Elements/HandleEntityLayoutStates.vue'
import TrackRow from '@/shared/UI/Elements/Track/TrackRow.vue'
import MusicRowHeader from '@/shared/UI/EntityPageElements/MusicRowHeader.vue'
import MusicRowHeaderWrapper from '@/shared/UI/EntityPageElements/MusicRowHeaderWrapper.vue'
import GeneralGradientSectionWithControls
  from '@/shared/UI/EntityPageElements/Sugar/GeneralGradientSectionWithControls.vue'
import PlayHeaderWithPlayingState from '@/shared/UI/EntityPageElements/Sugar/PlayHeaderWithPlayingState.vue'
import TrackTableWrapper from '@/shared/UI/EntityPageElements/TrackTableWrapper.vue'
import getCommaSeparatedString from '@/shared/utils/format/getCommaSeparatedString'
import setTitle from '@/shared/utils/setTitle'

const { t } = useI18n()

const route = useRoute('/playlist/[id]')
const layout = inject<Ref<HTMLElement & { content: HTMLElement }>>('layoutContent')

const currentPlayback = currentPlaybackStore()
const stream = reactive(useAudioStream())
const states = reactive(usePlaybackStates())

const albumId = computed(() => route.params.id)

const { data, isFetching, isError } = useQuery({
  queryKey: ['album', albumId],
  queryFn: async () => {
    const data = await fetchAlbum(albumId.value)

    setTitle(`${data.name} - Album by ${getCommaSeparatedString(data.artists, 'name')} | Spotify`)

    return data
  },
  staleTime: Infinity,
})

const isCurrentAlbum = computed(() => states.isCurrentPlayback('album', albumId.value))
const isAlbumPlaying = computed(() => isCurrentAlbum.value && stream.isPlaying)

const preferences = userPreferencesStore()
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
        :passing-height="280"
        :is-playing="isAlbumPlaying"
        :mask="data.maskColor"
        @play-click="setCurrentPlayback('album', albumId, data.tracks.items[0].id)"
      />

      <AlbumInfoHeader
        :images="data.images"
        :mask="data.maskColor"
        :name="data.name"
        :creator="data.artists"
        :tracks-amount="data.total_tracks"
        :release-date="data.release_date"
      />

      <GeneralGradientSectionWithControls
        :is-playing="isAlbumPlaying"
        :bg-color="data.maskColor"
        :tooltip-str="t('music-actions.moreOptionsFor', [data.name])"
        @play-click="setCurrentPlayback('album', albumId, data.tracks.items[0].id)"
      >
        <template #main-options>
          <AddToMediaLib
            class="add"
            :state="true"
            @click="currentPlayback.loadNextTracks"
          />
        </template>
        <template #additional-options>
          <FormatLibraryButton />
        </template>
      </GeneralGradientSectionWithControls>

      <MusicRowHeaderWrapper :parent-element="layout!.content">
        <MusicRowHeader class="row-header" :class="preferences.tracksFormat === 'Compact' && 'compact'">
          <template v-if="preferences.tracksFormat === 'Compact'" #var1>
            {{ t('entities.artist') }}
          </template>
        </MusicRowHeader>
      </MusicRowHeaderWrapper>

      <TrackTableWrapper
        v-slot="{ track, index }"
        :list="data.tracks.items"
        :size="preferences.tracksFormat === 'Compact' ? 32 : 56"
        :has-next="!!data.tracks.next"
        @load-more="loadNextPlayback(
          albumId,
          'album',
          data.tracks.next,
        )"
      >
        <TrackRow
          :index="index + 1"
          :track="track"
          :is-current="currentPlayback.currentTrackId === track.id"
          :is-playing="stream.isPlaying"
          :is-added="false"
          :compact="preferences.tracksFormat === 'Compact'"
          :class="preferences.tracksFormat === 'Compact' && 'compact'"
          class="row"
          show-artists
          hide-image
          @click="setCurrentPlayback('album', albumId, track.id)"
        >
          <template v-if="preferences.tracksFormat === 'Compact'" #var1>
            <CommaSeparatedArtistsLink class="artist" :artists="track.artists" />
          </template>
        </TrackRow>
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
