<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { setCurrentPlayback, useAudioStream, usePlaybackStates } from '@/features/MediaPlayer'
import PlaylistControls from '@/pageLayouts/playlist.id/PlaylistControls.vue'
import PlaylistInfo from '@/pageLayouts/playlist.id/PlaylistInfoHeader.vue'
import PlaylistTable from '@/pageLayouts/playlist.id/PlaylistTable.vue'
import { fetchPlaylist } from '@/services/sdk/entities/playlist'
import HandleEntityLayoutStates from '@/shared/UI/Elements/HandleEntityLayoutStates.vue'
import PlayHeaderWithPlayingState from '@/shared/UI/EntityPageElements/Sugar/PlayHeaderWithPlayingState.vue'
import getImageFromEntity from '@/shared/utils/image/getImageFromEntity'
import setTitle from '@/shared/utils/setTitle'

const route = useRoute('/playlist/[id]')
const playlistId = computed(() => route.params.id)

const stream = reactive(useAudioStream())
const states = reactive(usePlaybackStates())

const { data, isFetched, isFetching, isError } = useQuery({
  queryKey: ['playlist', playlistId],
  queryFn: async () => {
    const data = await fetchPlaylist(playlistId.value)

    setTitle(`${data.name} | Spotify Playlist`)

    return data
  },
  staleTime: 10000,
})

const isCurrentAlbum = computed(() => states.isCurrentPlayback('playlist', playlistId.value))
const isAlbumPlaying = computed(() => isCurrentAlbum.value && stream.isPlaying)
</script>

<template>
  <HandleEntityLayoutStates
    :is-fetching="isFetching"
    :is-error="isError"
    entity="playlist"
  >
    <div v-if="isFetched && data" class="playlist" :style="`--bg-mask: ${data.maskColor}`">
      <PlayHeaderWithPlayingState
        :title="data.name"
        :mask="data.maskColor"
        :is-playing="isAlbumPlaying"
        @play-click="setCurrentPlayback('playlist', playlistId, data.tracks.items[0].track.id)"
      />

      <PlaylistInfo
        :playlist-name="data.name"
        :playlist-description="data.description"
        :images="data.images"
        :mask="data.maskColor"
        :total-duration="100"
        :creator="data.owner"
        :creator-image="getImageFromEntity(data.owner.images, 1)"
        :creator-mask="data.owner.maskColor"
        :tracks-amount="data.tracks.total"
        :savings-amount="data.followers.total"
      />

      <PlaylistControls
        :playlist-id="data.id"
        :playlist-name="data.name"
        :mask-color="data.maskColor"
        :is-playing="isAlbumPlaying"
        :is-added="false"
        @play-click="setCurrentPlayback('playlist', playlistId, data.tracks.items[0].track.id)"
      />

      <PlaylistTable
        :items="data.tracks.items"
        :next-track-link="data.tracks.next"
        :playlist-id="data.id"
        :is-current="isCurrentAlbum"
        @set-track="(id) => setCurrentPlayback('playlist', playlistId, id)"
      />
    </div>
  </HandleEntityLayoutStates>
</template>

<style lang="scss" scoped>
.playlist {
  margin-top: -64px;
}
</style>
