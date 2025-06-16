<script setup lang="ts">
import type { PlaylistedTrack, SavedTrack, Track } from '@spotify/web-api-ts-sdk'
import { computed, inject, reactive, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { currentPlaybackStore, loadNextPlayback, useAudioStream } from '@/features/MediaPlayer'
import { userPreferencesStore } from '@/features/UserPreferences'
import PlaylistTableVar1 from '@/pageLayouts/playlist.id/PlaylistTableItems/PlaylistTableVar1.vue'
import PlaylistTableVar2 from '@/pageLayouts/playlist.id/PlaylistTableItems/PlaylistTableVar2.vue'
import MusicRow from '@/shared/UI/Elements/Track/TrackRow.vue'
import MusicRowHeader from '@/shared/UI/EntityPageElements/MusicRowHeader.vue'
import MusicRowHeaderWrapper from '@/shared/UI/EntityPageElements/MusicRowHeaderWrapper.vue'
import TrackTableWrapper from '@/shared/UI/EntityPageElements/TrackTableWrapper.vue'
import formatRelativeDate from '@/shared/utils/date/formatRelativeDate'

const props = defineProps<{
  items: PlaylistedTrack<Track>[] | SavedTrack[]
  nextTrackLink: string | null
  playlistId: string
  isCurrent: boolean
}>()

const emits = defineEmits<{
  setTrack: [id: string]
}>()

const { t } = useI18n()
const layoutContent = inject<Ref<HTMLElement & { content: HTMLElement }>>('layoutContent')

const stream = reactive(useAudioStream())
const currentPlayback = currentPlaybackStore()

const preferences = userPreferencesStore()

const tracks = computed(() => {
  return props.items.map(item => item.track)
})

const currentFormatClass = computed(() => {
  return preferences.tracksFormat.toLowerCase()
})
</script>

<template>
  <div class="playlist-table" :class="`table-${currentFormatClass}`">
    <MusicRowHeaderWrapper :parent-element="layoutContent!.content">
      <MusicRowHeader class="computedGrid">
        <template #var1>
          <template v-if="preferences.tracksFormat === 'Compact'">
            {{ t('entities.artist') }}
          </template>
          <template v-else>
            {{ t('entities.album') }}
          </template>
        </template>
        <template #var2>
          <template v-if="preferences.tracksFormat === 'Compact'">
            {{ t('entities.album') }}
          </template>
          <template v-else>
            {{ t('music-table.dateAdded') }}
          </template>
        </template>
        <template v-if="preferences.tracksFormat === 'Compact'" #var3>
          {{ t('music-table.dateAdded') }}
        </template>
      </MusicRowHeader>
    </MusicRowHeaderWrapper>

    <TrackTableWrapper
      v-slot="{ track, index }"
      :list="tracks"
      :size="preferences.tracksFormat === 'Compact' ? 32 : 56"
      @load-more="loadNextPlayback(
        playlistId,
        'playlist',
        nextTrackLink,
      )"
    >
      <MusicRow
        v-if="track"
        :index="index + 1"
        :is-current="currentPlayback.currentTrackId === track.id"
        :is-playing="stream.isPlaying"
        :track="track"
        :color="null"
        :is-added="false"
        :show-artists="true"
        :compact="preferences.tracksFormat === 'Compact'"
        class="row computedGrid"
        @click="emits('setTrack', track.id)"
      >
        <template #var1>
          <PlaylistTableVar1
            :album-id="track.album.id" :album-name="track.album.name"
            :format="preferences.tracksFormat" :artists="track.artists"
          />
        </template>
        <template #var2>
          <PlaylistTableVar2
            :album-id="track.album.id" :album-name="track.album.name"
            :format="preferences.tracksFormat" :added-at="items[index].added_at"
          />
        </template>
        <template v-if="preferences.tracksFormat === 'Compact'" #var3>
          <span class="added-at">
            {{ formatRelativeDate(items[index].added_at) }}
          </span>
        </template>
      </MusicRow>
    </TrackTableWrapper>
  </div>
</template>

<style scoped lang="scss">
.table-list {
  container: playlist-table / inline-size;

  .computedGrid {
    grid-template-columns:
      [index] 16px
      [main] minmax(120px, 6fr)
      [var1] minmax(120px, 4fr)
      [var2] minmax(120px, 4fr)
      [time] minmax(120px, 1fr);
  }

  @container playlist-table (max-width: 760px) {
    .computedGrid {
      grid-template-columns:
        [index] 16px
        [main] minmax(120px, 4fr)
        [var1] minmax(120px, 2fr)
        [var2] 0
        [time] minmax(120px, 1fr) !important;

      &:deep(.var2) {
        display: none;
      }
    }
  }

  @container playlist-table (max-width: 550px) {
    .computedGrid {
      grid-template-columns:
        [index] 16px
        [main] minmax(120px, 4fr)
        [var1] 0
        [var2] 0
        [time] minmax(120px, 1fr) !important;

      &:deep(.var1, .var2) {
        display: none;
      }
    }
  }
}

.playlist-table {
  container: playlist-table / inline-size;

  .row {
    &:deep(.var1, .var2), .link, .added-at {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      white-space: unset;
      word-break: break-all;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.375;
    }

    &:hover {
      .link, &:deep(.v-link) {
        color: var(--white);
      }
    }

    .link, &:deep(.v-link) {
      color: var(--text-soft);
      font-size: .875rem;
      font-weight: 500  ;

      &:hover {
        text-decoration: underline;
      }
    }

    .added-at {
      color: var(--text-soft);
      font-size: .875rem;
      font-weight: 500;
    }
  }
}

.table-compact {
  container: playlist-table / inline-size;

  .computedGrid {
    grid-template-columns:
      [index] 16px
      [main] minmax(120px, 6fr)
      [var1] minmax(120px, 4fr)
      [var2] minmax(120px, 3fr)
      [var3] minmax(120px, 2fr)
      [time] minmax(120px, 1fr);
  }

  @container playlist-table (max-width: 1000px) {
    .computedGrid {
      grid-template-columns:
        [index] 16px
        [main] minmax(120px, 6fr)
        [var1] minmax(120px, 4fr)
        [var2] minmax(120px, 3fr)
        [var3] 0
        [time] minmax(120px, 1fr);

      &:deep(.var3) {
        display: none;
      }
    }
  }

  @container playlist-table (max-width: 750px) {
    .computedGrid {
      grid-template-columns:
        [index] 16px
        [main] minmax(120px, 4fr)
        [var1] minmax(120px, 2fr)
        [var2] 0
        [var3] 0
        [time] minmax(120px, 1fr);

      &:deep(.var2, .var3,) {
        display: none;
      }
    }
  }

  @container playlist-table (max-width: 550px) {
    .computedGrid {
      grid-template-columns:
        [index] 16px
        [main] minmax(120px, 4fr)
        [var1] 0
        [var2] 0
        [var3] 0
        [time] minmax(120px, 1fr);

      &:deep(.var1, .var2, .var3) {
        display: none;
      }
    }
  }
}
</style>
