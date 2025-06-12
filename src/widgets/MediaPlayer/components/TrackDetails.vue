<script setup lang="ts">
import {storeToRefs} from 'pinia';
import CommaSeparatedArtistsLink from "@/shared/components/Sugar/CommaSeparatedArtistsLink.vue";
import MainTrackInfo from "@/shared/UI/Elements/MainTrackInfo.vue";
import Marquee from "@/shared/components/Marquee.vue";
import {currentPlaybackStore} from "@/features/MediaPlayer/store/currentPlaybackStore";
import {computed} from "vue";
import {currentTrackImage} from "@/features/MediaPlayer/utils/currentTrackImage";

const store = currentPlaybackStore();
const {currentPlaybackInfo, currentTrack} = storeToRefs(store);

const trackImage = computed(() => {
  return currentTrackImage(currentPlaybackInfo.value!, currentTrack.value!);
});
</script>

<template>
  <div class="track-details">
    <template v-if="currentTrack">
      <div class="track-image-outer">
        <img :src="trackImage" alt="">
      </div>

      <MainTrackInfo class="track-info">
        <template #title>
          <Marquee v-slot="{startMarquee}">
            <RouterLink
              class="track-link"
              :to="`/track/${currentTrack.id}`"
              @mouseenter="startMarquee()"
            >
              {{currentTrack.name}}
            </RouterLink>
          </Marquee>
        </template>
        <template #artists>
          <CommaSeparatedArtistsLink
            class="artist"
            :artists="currentTrack.artists"
          />
        </template>
      </MainTrackInfo>
    </template>
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
