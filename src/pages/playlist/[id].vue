<script setup lang="ts">
import { useRoute } from 'vue-router';
import setTitle from '@/shared/utils/setTitle';
import PlaylistHeader from '@/pageLayouts/playlist.id/PlaylistHeader.vue';
import PlaylistInfo from '@/pageLayouts/playlist.id/PlaylistInfo.vue';
import PlaylistTable from '@/pageLayouts/playlist.id/PlaylistTable.vue';

const route = useRoute('/playlist/[id]');

setTitle(`${route.params.id} | Spotify Playlist`);

const bgColor = 'rgb(240, 64, 112)';
</script>

<template>
  <PlaylistHeader :style="`--bg-mask: ${bgColor}`" />

  <div class="playlist" :style="`--bg-mask: ${bgColor}`">
    <PlaylistInfo />
    <PlaylistTable />
  </div>
</template>

<style lang="scss" scoped>
.playlist {
  margin-top: -64px;
}
</style>