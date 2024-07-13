<script setup lang="ts">
import Icon from "@/components/Icon.vue";
import getPlayPauseIcon from "../utils/getPlayPauseIcon";
import {computed, ref} from "vue";
import Range from "@/components/Range.vue";
import {useMusicStore} from "@/store/useMusicStore";
import {storeToRefs} from "pinia";
import useMusic from "@/composables/useMusic";
import {toggleAudioPlayingState} from "@/utils/audioUtils";

const musicStore = useMusicStore();
let {currentMusicData, currentMusicId, currentQueue} = storeToRefs(musicStore);

const {playing, currentTime, duration, volume} = useMusic({
  src: ref(currentMusicData.value.url)
});

const getAvatarPlayingAnimation = computed(() => {
  if (playing.value) {
    return `animation-play-state: running;`
  }

  return `animation-play-state: paused;`
});

function formatTime(time: number): string {
  let minutes = Math.trunc(time / 60) + '';
  let seconds = (time % 60).toFixed(0) + '';

  return minutes.padStart(2, '0') + ':' + seconds.padStart(2, '0')
}

function incrementMusicId() {
  const currentIndex = currentQueue.value.findIndex(value => value.id === currentMusicId.value);

  if (currentIndex + 1 === currentQueue.value.length) {
    return;
  }

  currentMusicId.value = currentQueue.value[currentIndex + 1].id
}

function decrementMusicId() {
  const currentIndex = currentQueue.value.findIndex(value => value.id === currentMusicId.value);

  if (currentIndex === 0) {
    return;
  }

  currentMusicId.value = currentQueue.value[currentIndex - 1].id
}

</script>

<template>
  <div class="media-player">
    <div class="musicBar">
      <div class="song-info">
        <div
            class="singer-logo"
            :style="[getAvatarPlayingAnimation, `background-image: url('${currentMusicData.avatar}');`]"
        />
        <div class="song-content">
          <h3>{{currentMusicData.name}}</h3>
          <p>{{currentMusicData.artist}}</p>
        </div>
      </div>
      <div class="controls">
        <Icon tag="button" @click="decrementMusicId()">
          skip_previous
        </Icon>
        <Icon tag="button" @click="toggleAudioPlayingState()">
          {{getPlayPauseIcon(playing as boolean)}}
        </Icon>
        <Icon tag="button" @click="incrementMusicId()">
          skip_next
        </Icon>
      </div>

      <div class="music-status">
        <span>
          {{formatTime(currentTime as number)}}
        </span>
        <Range class="range" v-model:current="currentTime" :max="duration" :step="0.1" />
        <span>
          {{formatTime(duration as number)}}
        </span>
      </div>

      <div class="music-volume">
        <Icon tag="button" >
          {{ volume > 0 ? "volume_up" : "volume_off"}}
        </Icon>

        <Range class="range" v-model:current="volume" :max="1" :step="0.01" />
      </div>

      <div class="options">
        <Icon tag="button" class="material-symbols-outlined">
          favorite
        </Icon>
        <Icon tag="button" class="material-symbols-outlined">
          repeat
        </Icon>
        <Icon tag="button" class="material-symbols-outlined">
          shuffle
        </Icon>
        <Icon tag="button">
          download
        </Icon>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.media-player {
  border-top: 1px #333333 solid;
  z-index: 2;
  font-family: 'Open Sans', sans-serif;
  position: fixed;
  bottom: 0;
  width: 100vw;
  max-width: 100vw;
  background-color: #0D0D0D;
  display: flex;

  .musicBar {
    height: 80px;
    display: flex;
    align-items: center;
    padding: 0 24px;
    width: 100%;

    & > div {
      height: 70%;
    }

    .song-info {
      display: flex;
      align-items: center;
      min-width: clamp(120px, 17vw, 270px);

      .singer-logo {
        display: flex;
        background-size: cover;
        background-position: center;
        height: 90%;
        aspect-ratio: 1/1;
        border-radius: 50%;
        animation: rotate 7s infinite linear;
      }

      .song-content {
        margin-left: 0.7rem;
        display: flex;
        flex-direction: column;
        gap: 2px;
        justify-content: center;

        h3 {
          font-size: 1.1rem;
          font-weight: 600;
        }

        p {
          font-size: 0.8rem;
          color: #bcbcbc;
        }
      }
    }

    .controls {
      display: flex;
      align-items: center;
      width: 150px;
      justify-content: space-between;
      gap: 10px;

      button {
        font-size: 2rem;
        cursor: pointer;
        border: none;
        background-color: inherit;
      }

      button:nth-child(2) {
        font-size: 1.9rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #FFFFFF;
        border-radius: 50%;
        height: 100%;
        aspect-ratio: 1/1;
        color: #0D0D0D;
      }
    }

    .music-status {
      margin-left: clamp(30px, 30vw, 45px);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 13px;
      flex: 1;

      span {
        width: 41px;
        font-size: 0.9rem;
        font-weight: 600;
        color: #d2d2d2;
      }

      .range {
        width: 100%;
      }

    }

    .music-volume {
      margin-left: 40px;
      display: flex;
      gap: 10px;
      align-items: center;
      width: 180px;

      button {
        background-color: initial;
        border: none;
      }

      .range {
        width: 100%;
      }
    }

    .options {
      display: flex;
      align-items: center;

      @media (max-width: 1500px) {
        & button:not(:last-child) {
          display: none;
        }
        & button:last-child {
          margin: 0 30px;
        }
      }

      button {
        border: none;
        background-color: inherit;
        cursor: pointer;
        margin-left: 35px;
        color: #858585;

        &:hover {
          color: #FFFFFF;
        }

        &:last-child {
          margin-right: 15px;
          color: #ee82ee;
          font-variation-settings:
              'FILL' 0,
              'wght' 900,
              'GRAD' 0,
              'opsz' 48;

          &:disabled {
            color: #858585;
          }
        }
      }
    }
  }
}


.bodyActive {
  overflow: hidden;
}


@keyframes rotate {
  0% {
    rotate: 0deg;
  }
  25% {
    rotate: 90deg;
  }
  50% {
    rotate: 180deg;
  }
  75% {
    rotate: 270deg;
  }
  100% {
    rotate: 360deg;
  }
}
</style>