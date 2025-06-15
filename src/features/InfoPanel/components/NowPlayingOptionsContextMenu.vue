<script setup lang="ts">
import {
  AddToFavouriteTracksState,
  AddToPlaylist,
  AddToQueue,
  BasicContextMenuView,
  Share,
  ToTheAlbum,
  ToTheArtist,
} from '@/features/ContextMenu'
import { currentPlaybackStore } from '@/features/MediaPlayer'

const currentPlayback = currentPlaybackStore()
</script>

<template>
  <BasicContextMenuView class="contextmenu">
    <AddToPlaylist />
    <AddToFavouriteTracksState :state="false" />
    <AddToQueue underline />
    <ToTheArtist :artists="currentPlayback.currentTrack!.artists" />
    <ToTheAlbum :to="`/album/${currentPlayback.currentTrack?.album.id}`" underline />
    <Share :entity-id="currentPlayback.currentPlaybackInfo!.id" type="Track" />
  </BasicContextMenuView>
</template>

<style scoped lang="scss">
.contextmenu {
  min-width: 300px;

}
</style>
