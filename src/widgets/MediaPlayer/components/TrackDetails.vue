<script setup lang="ts">
import {storeToRefs} from "pinia";
import {useCurrentMusicStore} from "@/features/MediaPlayer";

const store = useCurrentMusicStore();
const {currentAudioData} = storeToRefs(store);

</script>

<template>
  <div class="track-details">
    <div class="track-image-outer">
      <img :src="currentAudioData.avatar" alt="">
    </div>

    <div class="track-text-info">
      <a class="track-name">
        {{currentAudioData.name}}
      </a>
      <div class="track-artists">
        <RouterLink
            v-for="(artist, index) in currentAudioData.artists"
            :key="artist.id"
            :to="`/artist/${artist.url}`"
            v-bind="$attrs"
        >
      <span>
        {{artist.name}}
      </span>
          <template v-if="index !== currentAudioData.artists.length - 1">, </template>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
      font-size: .85em;
      cursor: pointer;
      font-weight: 700;

      &:hover {
        text-decoration: underline;
      }
    }

    .track-artists {
      font-size: .65em;

      a span {
        color: var(--text-soft);
        font-weight: 500;

        &:hover {
          color: var(--white);
          text-decoration: underline;
        }
      }
    }
  }

}
</style>