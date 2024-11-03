<script setup lang="ts">
import { useRoute } from 'vue-router';
import setTitle from '@/shared/utils/setTitle';
import PlayHeader from "@/UI/Blocks/PlayHeader.vue";
import PlaylistInfo from '@/pageLayouts/playlist.id/PlaylistInfoHeader.vue';
import PlaylistTable from '@/pageLayouts/playlist.id/PlaylistTable.vue';
import {useQuery} from "@tanstack/vue-query";
import musicInfoService from "@/services/api/music/apiMusicService";
import {computed, inject, ref, watch} from "vue";
import HandleEntityLayoutStates from "@/UI/Elements/HandleEntityLayoutStates.vue";

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
    entity="плейлист"
  />

  <PlayHeader
    v-if="dossier"
    :is-playing="false"
    :title="dossier.name"
    :scroll-y="scrollY"
    :mask="bgColor"
  />

  <div v-if="isFetched" class="playlist" :style="`--bg-mask: ${bgColor}`">
    <PlaylistInfo
      v-if="dossier"
      :id="dossier.id"
      :name="dossier.name"
      :image="dossier.image"
      :color="dossier.color"
      :creators="dossier.creators"
      :description="dossier.description"
      :info="dossier.info"
      :is-added="dossier.isAdded"
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