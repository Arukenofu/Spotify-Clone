<script setup lang="ts">
import {useRoute} from 'vue-router';
import PlayHeaderWithPlayingState from "@/shared/UI/EntityPageElements/Sugar/PlayHeaderWithPlayingState.vue";
import PlaylistInfo from '@/pageLayouts/playlist.id/PlaylistInfoHeader.vue';
import PlaylistTable from '@/pageLayouts/playlist.id/PlaylistTable.vue';
import {useQuery} from "@tanstack/vue-query";
import {computed, reactive} from "vue";
import HandleEntityLayoutStates from "@/shared/UI/Elements/HandleEntityLayoutStates.vue";
import setTitle from "@/shared/utils/setTitle";
import getImageFromEntity from "@/shared/utils/getImageFromEntity";
import PlaylistControls from "@/pageLayouts/playlist.id/PlaylistControls.vue";
import {fetchPlaylist} from "@/services/sdk/entities/playlist";
import {useAudioStream, usePlaybackStates} from "@/features/MediaPlayer";

const route = useRoute('/playlist/[id]');
const playlistId = computed(() => route.params.id);

const stream = reactive(useAudioStream());
const states = reactive(usePlaybackStates());

const {data, isFetched, isFetching, isError} = useQuery({
  queryKey: ['playlist', playlistId],
  queryFn: async () => {
    const data = await fetchPlaylist(playlistId.value);

    setTitle(`${data.name} | Spotify Playlist`);

    return data;
  },
  staleTime: 10000
});

const isCurrentAlbum = computed(() => states.isCurrentPlayback('playlist', playlistId.value));
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
      />

      <PlaylistInfo
        :playlist-name="data.name"
        :playlist-description="data.description"
        :image="getImageFromEntity(data.images, 0)"
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
      />

      <PlaylistTable
        :items="data.tracks.items"
        :next-track-link="data.tracks.next"
        :playlist-id="data.id"
        :is-current="isCurrentAlbum"
      />
    </div>
  </HandleEntityLayoutStates>
</template>

<style lang="scss" scoped>
.playlist {
  margin-top: -64px;
}
</style>