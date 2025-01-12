<script setup lang="ts">
import {storeToRefs} from 'pinia';
import useCurrentMusicStore from '@/features/MediaPlayer/store/useCurrentMusicStore';
import CommaSeparatedArtistsLink from "@/shared/components/Sugar/CommaSeparatedArtistsLink.vue";
import MainTrackInfo from "@/shared/UI/Elements/MainTrackInfo.vue";
import Marquee from "@/shared/components/Marquee.vue";

const store = useCurrentMusicStore();
const { currentAudioData } = storeToRefs(store)
</script>

<template>
  <div v-if="currentAudioData" class="track-details">
    <div class="track-image-outer">
      <img
        :src="currentAudioData.avatar ?? ''"
        alt=""
      >
    </div>

    <MainTrackInfo class="track-info">
      <template #title>
        <Marquee v-slot="{startMarquee}">
          <RouterLink
            class="track-link"
            :to="`/track/${currentAudioData.id}`"
            @mouseenter="startMarquee()"
          >
            {{currentAudioData.name}}
          </RouterLink>
        </Marquee>
      </template>
      <template #artists>
        <CommaSeparatedArtistsLink
          class="artist"
          :artists="currentAudioData.artists"
        />
      </template>
    </MainTrackInfo>
  </div>
</template>

<style lang="scss" scoped>
.track-details {
  min-width: 180px;
  width: 30%;
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 5px;

  .track-image-outer {
    --image-size: 54px;
    height: calc(var(--image-size));
    width: var(--image-size);
    position: relative;
    flex-shrink: 0;

    img {
      position: absolute;
      top: 0;
      object-fit: contain;
      height: var(--image-size);
      width: var(--image-size);
      border-radius: 3px;
    }
  }

  .track-info {

    .track-link {
      overflow: hidden;
      white-space: nowrap;
      font-weight: 500;
      font-size: .875rem;
      line-height: 1.3;
    }

    &:deep(.artist) {
      font-size: .75rem;
    }
  }
}
</style>
