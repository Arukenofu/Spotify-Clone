<script setup lang="ts">
import {useRoute} from 'vue-router';
import PlayHeaderWithPlayingState from "@/shared/UI/EntityPageElements/Sugar/PlayHeaderWithPlayingState.vue";
import PlaylistInfo from '@/pageLayouts/playlist.id/PlaylistInfoHeader.vue';
import PlaylistTable from '@/pageLayouts/playlist.id/PlaylistTable.vue';
import {useQuery, useQueryClient} from "@tanstack/vue-query";
import {computed, inject, ref} from "vue";
import HandleEntityLayoutStates from "@/shared/UI/Elements/HandleEntityLayoutStates.vue";
import {sdk} from "@/services/sdk";
import type {User} from "@spotify/web-api-ts-sdk";
import setTitle from "@/shared/utils/setTitle";
import useMusicUtils from "@/features/MediaPlayer/composables/useMusicUtils";
import getMaskColor from "@/shared/utils/getMaskColor";
import getImageFromEntity from "@/shared/utils/getImageFromEntity";
import PlaylistControls from "@/pageLayouts/playlist.id/PlaylistControls.vue";

const route = useRoute('/playlist/[id]');
const scrollY = inject('layoutScrollY', ref(0));
const queryClient = useQueryClient();
const albumId = computed(() => route.params.id);

async function fetchPlaylistData() {
  return sdk.playlists.getPlaylist(albumId.value);
}

async function getOwnerData(id: string) {
  const cachedUser = queryClient.getQueryData<User & {maskColor: string | null}>(['user', id])

  if (cachedUser && cachedUser.id === id) {
    return cachedUser;
  }

  const owner = await sdk.users.profile(id);
  const maskColor = await getMaskColor(owner)
  queryClient.setQueryData(['user', owner.id], {...owner, maskColor});

  return {...owner, maskColor};
}

const {data, isFetched, isFetching, isError} = useQuery({
  queryKey: ['playlistInfo', albumId],
  queryFn: async () => {
    const data = await fetchPlaylistData();
    const maskColor = await getMaskColor(data, 0);
    const owner = await getOwnerData(data.owner.id);

    setTitle(`${data.name} | Spotify Playlist`);

    return {...data, owner, maskColor};
  },
  staleTime: Infinity
});

const {isThisPlaylist} = useMusicUtils();
</script>

<template>
  <HandleEntityLayoutStates
    :is-fetching="isFetching"
    :is-error="isError"
    entity="Playlist"
  />

  <div v-if="isFetched && data" class="playlist" :style="`--bg-mask: ${data.maskColor}`">
    <PlayHeaderWithPlayingState
      :title="data.name"
      :scroll-y="scrollY"
      :mask="data.maskColor"
      :is-playing="isThisPlaylist(data.id, true)"
    />

    <PlaylistInfo
      :playlist-name="data.name"
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
      :is-added="false"
    />

    <PlaylistTable
      :items="data.tracks.items"
    />
  </div>
</template>

<style lang="scss" scoped>
.playlist {
  margin-top: -64px;
}
</style>