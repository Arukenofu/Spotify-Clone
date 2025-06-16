<script setup lang="ts">
import type { Page, Playlist, PlaylistedTrack, Track, UserProfile } from '@spotify/web-api-ts-sdk'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import LikedSongsImage from '@/assets/images/liked-songs.png'
import { currentPlaybackStore, useAudioStream } from '@/features/MediaPlayer'
import PlaylistTable from '@/pageLayouts/playlist.id/PlaylistTable.vue'
import { sdk } from '@/services/sdk'
import { getTrackData } from '@/services/sdk/entities/track.ts'
import FormatLibraryButton from '@/shared/UI/Buttons/FormatLibraryButton.vue'
import EntityInfoHeader from '@/shared/UI/Elements/EntityInfoHeader/EntityInfoHeader.vue'
import EntityInfoHeaderDot from '@/shared/UI/Elements/EntityInfoHeader/EntityInfoHeaderDot.vue'
import HandleEntityLayoutStates from '@/shared/UI/Elements/HandleEntityLayoutStates.vue'
import LazyImage from '@/shared/UI/Elements/LazyImage.vue'
import GeneralGradientSectionWithControls
  from '@/shared/UI/EntityPageElements/Sugar/GeneralGradientSectionWithControls.vue'
import PlayHeaderWithPlayingState from '@/shared/UI/EntityPageElements/Sugar/PlayHeaderWithPlayingState.vue'
import getImageFromEntity from '@/shared/utils/image/getImageFromEntity'

const maskColor = 'rgb(80, 56, 160)'

const { t } = useI18n()
const queryClient = useQueryClient()

const currentPlayback = currentPlaybackStore()
const stream = reactive(useAudioStream())

const currentUserData = queryClient.getQueryData<UserProfile>(['currentUser'])
const currentUserAvatar = getImageFromEntity(currentUserData!.images, 1)

const { data: favoriteTracks, isFetching, isError, suspense } = useQuery({
  queryKey: ['currentUserCollection'],
  queryFn: () => {
    return sdk.currentUser.tracks.savedTracks()
  },
  staleTime: Infinity,
  suspense: true,
})
await suspense()

function createPlaylist(tracks: Page<PlaylistedTrack<Track>>): Playlist<Track> {
  return {
    tracks,
    collaborative: false,
    description: '',
    external_urls: { spotify: '' },
    followers: { href: null, total: 0 },
    href: '',
    id: 'favorite',
    images: [{ url: LikedSongsImage, width: 300, height: 300 }],
    name: 'Любимые треки',
    owner: {
      id: '',
      display_name: '',
      external_urls: { spotify: '' },
      href: '',
      type: '',
      uri: '',
    },
    primary_color: '',
    public: false,
    snapshot_id: '',
    type: 'playlist',
    uri: '',
  }
}

async function setupCurrentPlayback(trackId: string) {
  const playbackId = currentPlayback.currentPlaybackInfo?.id

  if (trackId === currentPlayback.currentTrackId && playbackId === 'favorite') {
    stream.toggle()
    return
  }
  stream.pause()

  currentPlayback.currentTrack = await getTrackData(trackId)
  currentPlayback.currentTrackId = trackId
  currentPlayback.currentPlaybackType = 'playlist'

  if (playbackId !== 'favorite') {
    // @ts-expect-error: its the same
    currentPlayback.currentPlaybackInfo = createPlaylist(favoriteTracks.value!)
  }
}

const isCurrentAlbum = computed(() => currentPlayback.currentPlaybackInfo?.id === 'favorite')
const isAlbumPlaying = computed(() => isCurrentAlbum.value && stream.isPlaying)
</script>

<template>
  <HandleEntityLayoutStates
    :is-fetching="isFetching"
    :is-error="isError"
    entity="playlist"
  >
    <div v-if="favoriteTracks" class="collection">
      <PlayHeaderWithPlayingState
        title="Любимые треки"
        :is-playing="isAlbumPlaying"
        :mask="maskColor"
        @play-click="setupCurrentPlayback(favoriteTracks.items[0].track.id)"
      />

      <EntityInfoHeader
        :images="[{ url: LikedSongsImage, width: 300, height: 300 }]"
        :mask="maskColor"
        type="playlist"
        class="header"
      >
        <span class="type">{{ t('entities.playlist') }}</span>
        <h1 class="title">
          Любимые треки
        </h1>
        <div class="other-info">
          <div class="user">
            <LazyImage
              v-if="currentUserAvatar"
              :image="currentUserAvatar"
              class="user-avatar"
            />
            <RouterLink :to="`/user/${currentUserData!.id}`" class="user-link">
              {{ currentUserData!.display_name }}
            </RouterLink>
          </div>

          <EntityInfoHeaderDot />

          <span class="tracks-amount">
            {{ t('plurable-entities.track', favoriteTracks.total).toLowerCase() }}
          </span>
        </div>
      </EntityInfoHeader>

      <GeneralGradientSectionWithControls
        :is-playing="isAlbumPlaying"
        :bg-color="maskColor"
        tooltip-str=""
        turnoff-options
        @play-click="setupCurrentPlayback(favoriteTracks.items[0].track.id)"
      >
        <template #additional-options>
          <FormatLibraryButton />
        </template>
      </GeneralGradientSectionWithControls>

      <PlaylistTable
        :items="favoriteTracks.items"
        :next-track-link="favoriteTracks.next"
        playlist-id="favorite"
        :is-current="false"
        @set-track="setupCurrentPlayback"
      />
    </div>
  </HandleEntityLayoutStates>
</template>

<style scoped lang="scss">
.header {
  margin-top: -64px;
  container: collection-info / inline-size;

  .type {
    font-size: .875rem;
    font-weight: 500;
  }

  .title {
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

  @container collection-info (max-width: 1000px) {
    .title {
      font-size: 3.5em !important;
    }
  }

  @container collection-info (max-width: 700px) {
    .title {
      font-size: 2em !important;
    }
  }

  .other-info {
    display: flex;
    align-items: center;
    font-size: .875rem;

    .user {
      display: flex;
      align-items: center;

      .user-avatar {
        height: 24px;
        width: 24px;
        border-radius: 50%;
        margin-right: 4px;
      }

      .user-link {
        font-weight: 700;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .dot {
      color: var(--text-soft);
      font-weight: 500;
      margin: 0 4px;
    }

    .tracks-amount {
      color: var(--text-soft);
      font-weight: 500;
    }
  }
}
</style>
