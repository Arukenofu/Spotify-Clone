<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useCurrentMusicStore from '@/features/MediaPlayer/store/useCurrentMusicStore';
import CommaSeparatedArtistsLink from "@/shared/components/CommaSeparatedArtistsLink.vue";

const store = useCurrentMusicStore();
const { currentAudioData } = storeToRefs(store);
</script>

<template>
  <div v-if="currentAudioData" class="track-details">
    <div class="track-image-outer">
      <img
        :src="currentAudioData.avatar ?? ''"
        alt=""
      >
    </div>

    <div class="track-text-info">
      <a class="track-name">
        {{ currentAudioData.name }}
      </a>
      <div class="track-artists">
        <CommaSeparatedArtistsLink
          class="artists"
          :artists="currentAudioData.artists"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.track-details {
  display: flex;
  gap: 16px;

  .track-image-outer {
    --image-size: 54px;
    height: calc(var(--image-size));
    width: var(--image-size);
    position: relative;

    img {
      position: absolute;
      top: 0;
      object-fit: contain;
      height: var(--image-size);
      width: var(--image-size);
      border-radius: 3px;
    }
  }

  .track-text-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    line-height: 1;
    font-size: 1.05rem;

    .track-name {
      font-size: 0.85em;
      cursor: pointer;
      font-weight: 700;

      &:hover {
        text-decoration: underline;
      }
    }

    .track-artists {
      font-size: 0.65em;
      font-weight: 500;

      :deep(a) {
        color: var(--text-soft);

        &:hover {
          color: var(--white);
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
