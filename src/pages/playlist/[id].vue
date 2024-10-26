<script setup lang="ts">
import { useRoute } from 'vue-router';
import setTitle from '@/shared/utils/setTitle';
import PlayHeader from "@/UI/Blocks/PlayHeader.vue";
import PlaylistInfo from '@/pageLayouts/playlist.id/PlaylistInfo.vue';
import PlaylistTable from '@/pageLayouts/playlist.id/PlaylistTable.vue';
import {useQuery} from "@tanstack/vue-query";
import {MusicInfoService} from "@/services/api/music/musicInfoService";
import {computed, inject, ref} from "vue";

const routeId = Number(useRoute('/playlist/[id]').params.id);

setTitle(`${routeId} | Spotify Playlist`);

const {data, isFetched} = useQuery({
  queryKey: ['playlistInfo', routeId],
  queryFn: async () => await new MusicInfoService().getPlaylistInfo(routeId),
});

const dossier = computed(() => data.value?.playlistInfoDossier);
const queue = computed(() => data.value?.playlistQueue);
const bgColor = computed(() => data.value?.playlistInfoDossier.color ?? '#333333');

const scrollY = inject('layoutScrollY', ref(0));

</script>

<template>
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
      :image-url="dossier.imageUrl"
      :color="dossier.color"
      :creator="dossier.creator"
      :description="dossier.description"
      :additional="dossier.additional"
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