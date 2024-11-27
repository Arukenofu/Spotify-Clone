<script setup lang="ts">
import {
  AddToFavouriteTracksState,
  AddToPlaylist,
  AddToQueue,
  BasicContextMenuView,
  Share,
  ToTheAlbum,
  ToTheArtist
} from "@/features/ContextMenu";
import useCurrentMusicStore from "@/features/MediaPlayer/store/useCurrentMusicStore";

const store = useCurrentMusicStore();
</script>

<template>
  <BasicContextMenuView class="contextmenu">
    <AddToPlaylist />
    <AddToFavouriteTracksState :state="store.currentAudioData!.isAdded" />
    <AddToQueue underline />
    <ToTheArtist :artists="store.currentAudioData!.artists" />
    <ToTheAlbum :to="`/album/${store.currentAudioData!.album.id}`" underline />
    <Share :entity-id="store.currentAudioData!.id" type="Track" />
  </BasicContextMenuView>
</template>

<style scoped lang="scss">
.contextmenu {
  min-width: 300px;

}
</style>