<script setup lang="ts">
import {useRoute} from 'vue-router';
import setTitle from '@/shared/utils/setTitle';
import PlayHeaderWithPlayingState from "@/shared/UI/Blocks/Sugar/PlayHeaderWithPlayingState.vue";
import PlaylistInfo from '@/pageLayouts/playlist.id/PlaylistInfoHeader.vue';
import PlaylistTable from '@/pageLayouts/playlist.id/PlaylistTable.vue';
import {useQuery} from "@tanstack/vue-query";
import musicInfoService from "@/services/api/music/apiMusicService";
import {computed, inject, ref, watch} from "vue";
import HandleEntityLayoutStates from "@/shared/UI/Elements/HandleEntityLayoutStates.vue";
import PlaylistControls from "@/pageLayouts/playlist.id/PlaylistControls.vue";

const route = useRoute('/playlist/[id]');

watch(() => route.params.id, () => {
  refetch();
});

const {data, isFetched, isFetching, isError, refetch} = useQuery({
  queryKey: ['playlistInfo', route.params.id],
  queryFn: async () => {
    const data = await musicInfoService.getPlaylistInfo(Number(route.params.id));

    setTitle(`${data.playlistInfoDossier.name} | Spotify Playlist`);

    return data;
  },
});

const dossier = computed(() => data.value?.playlistInfoDossier);
const queue = computed(() => data.value?.playlistQueue);
const bgColor = computed(() => data.value?.playlistInfoDossier.color ?? '#333333');

const scrollY = inject('layoutScrollY', ref(0));
</script>

<template>
  <HandleEntityLayoutStates
    :is-fetching="isFetching"
    :is-error="isError"
    entity="Playlist"
  />

  <div v-if="isFetched" class="playlist" :style="`--bg-mask: ${bgColor}`">
    <PlayHeaderWithPlayingState
      v-if="dossier"
      :is-playing="false"
      :title="dossier.name"
      :scroll-y="scrollY"
      :mask="bgColor"
    />

    <PlaylistInfo
      v-if="dossier"
      :image="dossier.image"
      :mask="dossier.color"
      :name="dossier.name"
      :creators="dossier.creators"
      :tracks-amount="dossier.info.tracksAmount"
      :total-duration="dossier.info.totalDuration"
    />

    <PlaylistControls
      :queue="queue!"
      :dossier="dossier!"
    />

    <PlaylistTable
      v-if="dossier"
      :queue="queue!"
      :dossier="dossier"
    />
  </div>
</template>

<style lang="scss" scoped>
.playlist {
  margin-top: -64px;
}
</style>