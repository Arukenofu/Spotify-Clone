<script setup lang="ts" generic="T">
import {onMounted, ref, watch} from "vue";
import {useUserConfigStore} from "@/store/useUserConfigStore";
import {useMusicStore} from "@/store/useMusicStore";
import {storeToRefs} from "pinia";

import Repeat from "@/UI/Icons/MediaPlayer/Repeat.vue";
import Previous from "@/UI/Icons/MediaPlayer/Previous.vue";
import Next from "@/UI/Icons/MediaPlayer/Next.vue";
import RandomOrder from "@/UI/Icons/MediaPlayer/RandomOrder.vue";
import PlayingState from "@/UI/Icons/Shared/PlayingState.vue";
import Range from "@/components/Range.vue";
import NowPlaying from "@/UI/Icons/MediaPlayerControls/NowPlaying.vue";
import ShowText from "@/UI/Icons/MediaPlayerControls/ShowText.vue";
import ShowQueue from "@/UI/Icons/MediaPlayerControls/ShowQueue.vue";
import ConnectToDevice from "@/UI/Icons/MediaPlayerControls/ConnectToDevice.vue";
import Volume from "@/UI/Icons/MediaPlayerControls/Volume.vue";
import FullScreen from "@/UI/Icons/MediaPlayerControls/FullScreen.vue";
import VolumeSilent from "@/UI/Icons/MediaPlayerControls/VolumeSilent.vue";

import formatTime from "../utils/formatTime";
import getActiveColor from "@/utils/getActiveColor";
import getRandomNumber from "@/utils/getRandomNumber";
import useMusicUtils from "@/composables/useMusicUtils";

const musicStore = useMusicStore();

const {audio, isPlaying, currentAudioData, currentQueue, currentAudioIndexInQueue} = storeToRefs(musicStore);
const {toggleTrackPlaying, nextTrack, previousTrack, loadSong} = useMusicUtils();

const userConfig = useUserConfigStore();
const {isShuffle, currentRepeatMode, volume} = storeToRefs(userConfig);

const currentTime = ref<number>(0);
const duration = ref<number>(0);

onMounted(() => {
  setInterval(() => {
    loadMetaData();
    autoTimeUpdate();
  }, 1500);
});

async function onMusicEnded() {
  if (currentRepeatMode.value === 'repeatCurrentMusic') {
    return audio.value?.play();
  }

  if (isShuffle.value) {
    return loadSong(currentQueue.value[getRandomNumber(currentQueue.value.length - 1, currentAudioIndexInQueue.value)]);
  }

  if (currentRepeatMode.value === 'repeatCurrentPlaylist') {
    return nextTrack();
  }

  isPlaying.value = false;
}

function autoTimeUpdate() {
  audio.value?.addEventListener('timeupdate', () => {
    currentTime.value = audio.value!.currentTime;
  });

  if (currentTime.value === duration.value) {
    onMusicEnded();
  }
}

function timeUpdate(time: number) {
  audio.value!.currentTime = time;
  isPlaying.value = true;
}

function volumeUpdate(newVolume: number) {
  audio.value!.volume = newVolume;
  volume.value = newVolume;
}

function toggleVolume() {
  if (volume.value === 0 && audio.value?.volume === 0 && !localStorage.getItem('volumeCached')) {
    audio.value!.volume = 1;
    volume.value = 1;

    return;
  }

  if (audio.value!.volume === 0) {
    audio.value!.volume = JSON.parse(localStorage.getItem('volumeCached')!);
    volume.value = JSON.parse(localStorage.getItem('volumeCached')!);
    localStorage.removeItem('volumeCached')

    return;
  }

  localStorage.setItem('volumeCached', JSON.stringify(volume.value));
  volume.value = 0;
  audio.value!.volume = 0
}

function loadMetaData() {
  audio.value?.addEventListener("loadedmetadata", () => {
    duration.value = audio.value!.duration;
  });
}

watch(audio, () => {
  loadMetaData();
});


</script>

<template>
  <div class="player" v-if="audio">
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
              class="artist"
              v-for="(artist, index) in currentAudioData.artists"
              :key="artist.id"
              :to="`/artist/${artist.url}`"
          >
            <span>
              {{artist.name}}
            </span>
            <template v-if="index !== currentAudioData.artists.length - 1">, </template>
          </RouterLink>
        </div>
      </div>
    </div>

    <div class="track-controls">
      <div class="options">
        <RandomOrder
            class="icon"
            :style="getActiveColor(isShuffle, 'fill')"
            @click="isShuffle =! isShuffle"
        />
        <Previous
            v-tooltip="'Назад'"
            @click="previousTrack()"
            class="icon pointerable"
        />
        <PlayingState
            v-tooltip="isPlaying ? 'Остановить' : 'Слушать'"
            :state="isPlaying"
            @click="toggleTrackPlaying()"
            class="icon musicState pointerable"
        />
        <Next
            v-tooltip="'Далее'"
            @click="nextTrack()"
            class="icon pointerable"
        />
        <Repeat
            :style="getActiveColor(currentRepeatMode !== 'onlyCurrentMusic', 'fill')"
            @click="userConfig.toggleRepeatMode()"
            :state="currentRepeatMode!"
            class="icon"
        />
      </div>

      <div class="progress">
        <div class="currentTime">
          {{formatTime(currentTime)}}
        </div>

        <Range
            class="range"
            :max="duration"
            :current="currentTime"
            :thumb-fix="1"
            @onValueChange="timeUpdate"
            @mousedown="audio.pause()"
            @mouseup="audio.play()"
        />

        <div class="duration">
          {{formatTime(duration)}}
        </div>
      </div>
    </div>

    <div class="additional-controls">
      <div class="options">

        <NowPlaying
            class="icon"
            v-tooltip="'Экран «Сейчас играет»'"
        />

        <ShowText
            class="icon"
            v-tooltip="'Текст'"
        />

        <ShowQueue
            class="icon"
            v-tooltip="'Очередь'"
        />

        <ConnectToDevice
            class="icon"
            v-tooltip="'Подключиться к устройству'"
        />

        <div class="volume-option">
          <Volume
              v-if="volume !== 0"
              class="icon"
              v-tooltip="'Выключить звук'"
              @click="toggleVolume()"
          />
          <VolumeSilent
              v-else
              class="icon"
              v-tooltip="'Включить звук'"
              @click="toggleVolume()"
          />

          <Range
              class="range"
              :max="1"
              :thumb-fix="6"
              v-model:current="volume!"
              :step="0.01"
              @onValueChange="volumeUpdate"
          />
        </div>

        <FullScreen
            class="icon fullscreen"
            v-tooltip="'На весь экран'"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.player {
  height: var(--player-height);
  display: grid;
  grid-template-columns: 1fr 1.25fr 1fr;
  grid-gap: var(--border-radius);
  align-items: center;
  padding: 0 14px;

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

  .track-controls {
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .options {
      height: 32px;
      display: flex;
      justify-content: center;
      gap: 8px;

      .musicState {
        background-color: var(--white);
        fill: var(--black);
        border-radius: 50%;
        margin: 0 9px;

        &:hover, &:active {
          fill: var(--black);
          scale: 1.1;
        }
      }

      .pointerable {
        cursor: pointer;
      }
    }

    .progress {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 6px;

      .range {
        flex: 1;
      }

      .currentTime, .duration {
        position: relative;
        top: 1px;
        line-height: 0;
        color: var(--text-soft);
        font-size: 1rem;
        font-weight: 500;
        font-family: "Zain", sans-serif;
      }
    }
  }

  .additional-controls {

    .options {
      display: flex;

      .icon:first-child {
        margin-left: auto;
      }

      .icon {
        width: 32px;
        cursor: pointer;
      }

      .volume-option {
        display: flex;
        align-items: center;

        .range {
          width: 100px;
        }
      }
    }
  }
}

.icon {
  height: 100%;
  aspect-ratio: 1/1;
  display: grid;
  place-items: center;
  background: none;
  border: none;
  fill: var(--text-soft);

  &:hover, &:active {
    fill: var(--white);
  }

  &:deep {
    svg {
      height: 16px;
      aspect-ratio: 1/1;
    }
  }
}

.fullscreen {
  margin-left: 11px;

  // TODO: update tooltip positioning on screen edge
  &:hover::before {
    left: -50%;
  }
}
</style>