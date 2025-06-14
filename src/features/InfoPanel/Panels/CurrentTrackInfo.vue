<script setup lang="ts">
import PanelHeader from "@/widgets/LayoutInfoPanel/components/PanelHeader.vue";
import {computed, watch} from "vue";
import ThreeDots from "@/shared/UI/Icons/ThreeDots.vue";
import RoundButton from "@/shared/UI/Buttons/RoundButton.vue";
import NowPlayingOptionsContextMenu from "@/features/InfoPanel/components/NowPlayingOptionsContextMenu.vue";
import {ContextMenu} from "@/features/ContextMenu";
import ScrollableBlock from "@/shared/UI/Blocks/ScrollableBlock.vue";
import {useQuery} from "@tanstack/vue-query";
import apiArtistService from "@/services/api/artist/apiArtistService";
import type {Artist} from "@/services/types/Entities/Artist";
import AboutArtistCard from "@/features/InfoPanel/components/AboutArtistCard.vue";
import AboutTrackInfo from "@/features/InfoPanel/components/AboutTrackInfo.vue";
import NoQueue from "@/features/InfoPanel/components/NoQueue.vue";
import {useI18n} from "vue-i18n";
import {currentPlaybackStore, currentTrackImage} from "@/features/MediaPlayer";

const {t} = useI18n();

const currentPlayback = currentPlaybackStore();

const {data: artistDossier, suspense, refetch} = useQuery<Artist | null>({
  queryKey: ['artistInfo'],
  queryFn: async () => {currentPlayback.currentTrack
    if (!currentPlayback.currentTrack) {
      return null;
    }

    const artists = currentPlayback.currentTrack!.artists;

    return await apiArtistService.getArtistInfo(artists[0].id);
  },
  suspense: true
});

watch(() => currentPlayback.currentTrackId, () => {
  refetch();
});

await suspense();

const nextSongInQueue = computed(() => {
  return currentPlayback.currentPlaybackInfo?.tracks.items[currentPlayback.currentTrackIndex];
});
</script>

<template>
  <NoQueue v-if="!currentPlayback.currentTrack" />

  <div v-else class="now-playing">
    <PanelHeader class="head-panel">
      <template #name>
        {{currentPlayback.currentTrack.name}}
      </template>
      <template #options>
        <ContextMenu trigger="click" placement="bottom-end">
          <RoundButton v-tooltip="t('music-actions.moreOptionsFor', [currentPlayback.currentTrack.name])">
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
          :id="currentPlayback.currentTrack.id"
          :name="currentPlayback.currentTrack.name"
          :avatar="currentTrackImage(
            currentPlayback.currentPlaybackInfo!,
            currentPlayback.currentTrack!
          )"
          :loading-color="''"
          :artists="currentPlayback.currentTrack.artists"
          :is-added-to-favorites="false"
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