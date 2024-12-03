<script setup lang="ts">
import {storeToRefs} from 'pinia';
import useCurrentMusicStore from '@/features/MediaPlayer/store/useCurrentMusicStore';
import CommaSeparatedArtistsLink from "@/shared/components/CommaSeparatedArtistsLink.vue";
import Marquee from "@/shared/components/Marquee.vue";

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
      <div class="track-name">
        <Marquee
          v-slot="{startMarquee}"
          :iteration-count="2"
          class="marquee"
        >
          <RouterLink
            class="link"
            to="/"
            @mouseenter="startMarquee"
          >
            {{currentAudioData.name}}
          </RouterLink>
        </Marquee>
      </div>
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

  .track-text-info {
    height: min-content;
    display: grid;
    column-gap: 8px;
    grid-template: "pretitle pretitle" "title title" "badges subtitle"/auto 1fr;
    line-height: 1;
    font-size: 1.05rem;

    .track-name {
      grid-area: title;
      font-size: 0.85em;
      cursor: pointer;
      width: 100%;

      .marquee {

        .link {
          padding-left: 6px;
          overflow: hidden;
          white-space: nowrap;
          font-weight: 500;
          font-size: .9rem;
          line-height: 1.3;
        }

      }

      &:hover {
        text-decoration: underline;
      }
    }

    .track-artists {
      display: inline-flex;
      grid-area: subtitle;
      grid-column-start: badges;
      align-items: baseline;
      font-size: 0.75rem;
      font-weight: 500;

      :deep(a) {
        color: var(--text-soft);
        line-height: 1.375;

        &:hover {
          color: var(--white);
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
