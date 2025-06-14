<script setup lang="ts">
import {computed} from "vue";
import {storeToRefs} from "pinia";
import CommaSeparatedArtistsLink from "@/shared/components/Sugar/CommaSeparatedArtistsLink.vue";
import {currentPlaybackStore, currentTrackImage} from "@/features/MediaPlayer";
import {getAccentColor} from "@/shared/utils/colors/getAccentColor";

const store = currentPlaybackStore();
const {currentPlaybackInfo, currentTrack} = storeToRefs(store);

const trackImage = computed(() => {
  return currentTrackImage(currentPlaybackInfo.value!, currentTrack.value!, 0);
});

const maskColor = trackImage.value && await getAccentColor(trackImage.value);
</script>

<template>
  <div class="background" :style="`background-color: ${maskColor}`" />

  <div v-if="currentPlaybackInfo && currentTrack" class="info">
    <div class="playlist-info">
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.539a.498.498 0 0 1-.686.166c-1.878-1.148-4.243-1.408-7.028-.772a.499.499 0 0 1-.222-.972c3.048-.696 5.662-.396 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.322-5.428-1.705-7.972-.932a.624.624 0 1 1-.362-1.194c2.905-.882 6.517-.455 8.987 1.063a.624.624 0 0 1 .205.858zm.084-2.269C10.153 5.561 5.9 5.42 3.438 6.167a.748.748 0 1 1-.434-1.432c2.826-.857 7.523-.692 10.492 1.07a.748.748 0 0 1-.764 1.287z"></path></svg>
      <div class="metadata">
        <div class="header">PLAYING FROM PLAYLIST</div>
        <div class="name">{{currentPlaybackInfo.name}}</div>
      </div>
    </div>
    <div class="current-music">
      <div class="image">
        <img :src="trackImage ?? ''" alt="">
      </div>
      <div class="added-at">
        <div class="track-name">{{currentTrack.name}}</div>
        <div class="track-creators">
          <CommaSeparatedArtistsLink
            class="artistLink"
            :artists="currentTrack.artists"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@media (aspect-ratio: 16 / 9) {
  .info {
    font-size: .4166666667vw !important;
  }
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
  background: linear-gradient(180deg,rgba(0,0,0,.4),rgba(0,0,0,.2) 98.07%),linear-gradient(0deg,rgba(0,0,0,.1),rgba(0,0,0,.1)),transparent;
  transition: background-color 1s ease-in-out;
}

.info {
  bottom: 0;
  height: 100%;
  width: 100%;
  position: absolute;
  overflow: hidden;
  z-index: 10;
  font-size: .3vw;
  user-select: none;

  .playlist-info {
    height: 8em;
    margin: 9em 0 16em;
    padding: 0 14.5em;
    position: relative;
    pointer-events: none;

    .icon {
      fill: var(--white);
      display: inline-block;
      width: 8em;
      height: 8em;
      margin-right: 3em;
      opacity: .6;
      vertical-align: middle;
    }

    .metadata {
      color: hsla(0,0%,100%,.6);
      display: inline-block;
      max-width: 124.5em;
      overflow: hidden;
      vertical-align: middle;
      white-space: nowrap;

      .header {
        font-size: 2.25em;
        letter-spacing: .1111111111em;
        line-height: 1.3333333333em;
        text-transform: uppercase;
      }

      .name {
        font-size: 3em;
        font-weight: 700;
        line-height: 1.3333333333em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .current-music {
    transition: transform 1s cubic-bezier(.3,0,.4,1),-webkit-transform 1s cubic-bezier(.3,0,.4,1);
    transform: translateY(-24.5em);
    bottom: -24.5em;
    height: 100%;
    overflow: hidden;
    position: absolute;
    width: 100%;
    z-index: 10;

    .image {
      transition: transform 1s cubic-bezier(.3,0,.4,1) 1s,opacity .5s ease-in-out,bottom 1s cubic-bezier(.3,0,.4,1),-webkit-transform 1s cubic-bezier(.3,0,.4,1) 1s;
      border-radius: 1.6em;
      bottom: 38em;
      height: 64em;
      left: 14em;
      overflow: hidden;
      position: absolute;
      transform: scale(1);
      transform-origin: bottom left;
      width: 64em;

      img {
        height: 100%;
        left: 0;
        object-fit: cover;
        position: absolute;
        top: 0;
        width: 100%;
      }
    }

    .added-at {
      transition: transform 1s cubic-bezier(.3,0,.4,1) 1s,opacity .5s cubic-bezier(.3,0,.4,1),left 1s cubic-bezier(.3,0,.4,1),-webkit-transform 1s cubic-bezier(.3,0,.4,1) 1s;;
      bottom: 36.5em;
      font-weight: 900;
      left: 42em;
      position: absolute;
      right: 55em;
      text-align: left;
      transform: translate3d(42em,0,0);

      .track-name {
        display: -webkit-box;
        font-size: 8em;
        line-height: 1.25em;
        -webkit-line-clamp: 5;
        line-clamp: 5;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .track-creators {
        font-size: 3em;
        line-height: 1.6666666667em;
        opacity: .7;
      }
    }
  }
}
</style>