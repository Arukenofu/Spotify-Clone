<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import RandomOrder from '@/UI/Icons/MediaPlayer/RandomOrder.vue';
import Previous from '@/UI/Icons/MediaPlayer/Previous.vue';
import PlayingState from '@/UI/Icons/Shared/PlayingState.vue';
import Next from '@/UI/Icons/MediaPlayer/Next.vue';
import Repeat from '@/UI/Icons/MediaPlayer/Repeat.vue';
import Range from '@/shared/components/Range.vue';

import { useUserSettings } from '@/widgets/MediaPlayer/store/useUserSettings';
import {
  useCurrentMusicStore,
  useMusicStore,
  useMusicUtils,
  usePlaylistStore
} from '@/features/MediaPlayer';
import getRandomNumber from '@/shared/utils/getRandomNumber';
import getActiveColor from '@/shared/utils/getActiveColor';
import formatTime from '@/shared/utils/formatTime';

import { storeToRefs } from 'pinia';

const musicStore = useMusicStore();
const playlistStore = usePlaylistStore();
const currentMusicStore = useCurrentMusicStore();

const { audio, isPlaying } = storeToRefs(musicStore);
const { currentQueue } = storeToRefs(playlistStore);
const { currentAudioIndexInQueue } = storeToRefs(currentMusicStore);

const { toggleTrackPlaying, nextTrack, previousTrack, loadSong } =
  useMusicUtils();

const userConfig = useUserSettings();
const { isShuffle, currentRepeatMode, volume } = storeToRefs(userConfig);

const currentTime = ref<number>(0);
const duration = ref<number>(0);

onMounted(() => {
  loadMetaData();
  autoTimeUpdate();

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
    return loadSong(
      currentQueue.value[
        getRandomNumber(
          currentQueue.value.length - 1,
          currentAudioIndexInQueue.value
        )
      ]
    );
  }

  if (currentRepeatMode.value === 'repeatCurrentPlaylist') {
    return nextTrack();
  }

  isPlaying.value = false;
}

function autoTimeUpdate() {
  audio.value?.addEventListener('timeupdate', () => {
    currentTime.value = audio.value!.currentTime;

    if (currentTime.value === duration.value) {
      onMusicEnded();
    }
  });
}

function timeUpdate(time: number) {
  audio.value!.currentTime = time;
  isPlaying.value = true;
}

function loadMetaData() {
  audio.value?.addEventListener('loadedmetadata', () => {
    audio.value!.volume = volume.value;
    duration.value = audio.value!.duration;
  });
}

watch(audio, () => {
  loadMetaData();
});
</script>

<template>
  <div class="track-controls">
    <div class="options">
      <RandomOrder
        class="icon"
        :style="getActiveColor(isShuffle, 'fill')"
        @click="isShuffle = !isShuffle"
      />
      <Previous
        v-tooltip="'Назад'"
        @click="previousTrack()"
        class="icon pointerable"
      />
      <button
        @click="toggleTrackPlaying()"
        class="icon musicState pointerable"
        v-tooltip="isPlaying ? 'Остановить' : 'Слушать'"
      >
        <PlayingState :state="isPlaying" class="icon" />
      </button>
      <Next v-tooltip="'Далее'" @click="nextTrack()" class="icon pointerable" />
      <Repeat
        :style="
          getActiveColor(currentRepeatMode !== 'onlyCurrentMusic', 'fill')
        "
        @click="userConfig.toggleRepeatMode()"
        :state="currentRepeatMode!"
        class="icon"
      />
    </div>

    <div class="progress">
      <div class="currentTime">
        {{ formatTime(currentTime) }}
      </div>

      <Range
        class="range"
        :max="duration"
        :current="currentTime"
        :thumb-fix="1"
        @onValueChange="timeUpdate"
        @mousedown="audio!.pause()"
        @mouseup="audio!.play()"
      />

      <div class="duration">
        {{ formatTime(duration) }}
      </div>
    </div>
  </div>
</template>

<style scoped>
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
      border-radius: 50%;
      margin: 0 9px;

      &:deep(.icon) {
        fill: var(--black);
        width: 20px;
        height: 20px;
      }

      &:hover,
      &:active {
        scale: 1.04;
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

    .currentTime,
    .duration {
      position: relative;
      top: 1px;
      line-height: 0;
      color: var(--text-soft);
      font-size: 1rem;
      font-weight: 500;
      font-family: 'Zain', sans-serif;
    }
  }
}
</style>
