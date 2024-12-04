<script setup lang="ts">
import PanelHeader from "@/widgets/LayoutInfoPanel/components/PanelHeader.vue";
import useCurrentMusicStore from "@/features/MediaPlayer/store/useCurrentMusicStore";
import {computed, watch} from "vue";
import ThreeDots from "@/UI/Icons/Shared/ThreeDots.vue";
import RoundButton from "@/UI/Buttons/RoundButton.vue";
import NowPlayingOptionsContextMenu from "@/features/InfoPanel/components/NowPlayingOptionsContextMenu.vue";
import {ContextMenu} from "@/features/ContextMenu";
import ScrollableBlock from "@/UI/Blocks/ScrollableBlock.vue";
import {useQuery} from "@tanstack/vue-query";
import apiArtistService from "@/services/api/artist/apiArtistService";
import type {Artist} from "@/services/types/Entities/Artist";
import usePlaylistStore from "@/features/MediaPlayer/store/usePlaylistStore";
import AboutArtistCard from "@/features/InfoPanel/components/AboutArtistCard.vue";
import AboutTrackInfo from "@/features/InfoPanel/components/AboutTrackInfo.vue";
import NextTrackInQueue from "@/features/InfoPanel/components/NextTrackInQueue.vue";
import NoQueue from "@/features/InfoPanel/components/NoQueue.vue";

const store = useCurrentMusicStore();
const playlist = usePlaylistStore();

const currentAudioData = computed(() => store.currentAudioData);

const {data: artistDossier, suspense, refetch} = useQuery<Artist | null>({
  queryKey: ['artistInfo'],
  queryFn: async () => {
    if (!currentAudioData.value) {
      return null;
    }

    const artists = currentAudioData.value!.artists;

    return await apiArtistService.getArtistInfo(artists[0].id);
  },
  suspense: true
});

watch(() => store.currentAudioId, () => {
  refetch();
});

await suspense();

const nextSongInQueue = computed(() => {
  if (!playlist.currentQueue.length || store.currentAudioIndexInQueue == null) {
    return;
  }

  return playlist.currentQueue[store.currentAudioIndexInQueue + 1];
});
</script>

<template>
  <NoQueue v-if="!currentAudioData" />

  <div v-else class="now-playing">
    <PanelHeader class="head-panel">
      <template #name>
        {{currentAudioData.name}}
      </template>
      <template #options>
        <ContextMenu trigger="click" placement="bottom-end">
          <RoundButton v-tooltip="`Открыть контекстное меню: ${currentAudioData.name}`">
            <ThreeDots class="icon" />
          </RoundButton>

          <template #menu>
            <NowPlayingOptionsContextMenu />
          </template>
        </ContextMenu>
      </template>
    </PanelHeader>

    <ScrollableBlock class="content">
      <div class="content-wrapper">
        <AboutTrackInfo
          :id="currentAudioData.id"
          :name="currentAudioData.name"
          :avatar="currentAudioData.avatar"
          :loading-color="currentAudioData.color"
          :artists="currentAudioData.artists"
          :is-added-to-favorites="currentAudioData.isAddedToFavorites"
        />

        <AboutArtistCard
          v-if="artistDossier"
          v-model="artistDossier.isSubscribed"
          :artist-id="artistDossier.id"
          :artist-name="artistDossier.profile.artistName"
          :cover-image="artistDossier.profile.coverImage"
          :listeners-quantity="artistDossier.listenersQuantityPerMonth"
          :description="artistDossier.profile.description"
        />

        <NextTrackInQueue
          v-if="nextSongInQueue"
          :next-song="nextSongInQueue"
        />
      </div>
    </ScrollableBlock>
  </div>
</template>

<style scoped lang="scss">
.now-playing {
  height: 100%;

  .head-panel {
    .icon {
      width: 20px;
      height: 20px;
      fill: var(--text-soft);
    }
  }

  .content {
    height: calc(100% - var(--info-panel-header-height));
    user-select: none;

    .content-wrapper {
      padding: 0 16px;
    }
  }
}
</style>