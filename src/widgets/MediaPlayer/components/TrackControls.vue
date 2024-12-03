<script setup lang="ts">
import {onMounted, watch} from 'vue';
import {storeToRefs} from 'pinia';
import RandomOrder from '@/UI/Icons/MediaPlayer/RandomOrder.vue';
import Previous from '@/UI/Icons/MediaPlayer/Previous.vue';
import PlayingState from '@/UI/Icons/Shared/PlayingState.vue';
import Next from '@/UI/Icons/MediaPlayer/Next.vue';
import Repeat from '@/UI/Icons/MediaPlayer/Repeat.vue';
import Range from '@/shared/components/Range.vue';
import {useUserSettings} from '@/widgets/MediaPlayer/store/useUserSettings';
import getRandomNumber from '@/shared/utils/getRandomNumber';
import getActiveColor from '@/shared/utils/getActiveColor';
import formatTime from '@/shared/utils/format/formatTimeMMSS';
import useMusicStore from '@/features/MediaPlayer/store/useMusicStore';
import usePlaylistStore from '@/features/MediaPlayer/store/usePlaylistStore';
import useCurrentMusicStore from '@/features/MediaPlayer/store/useCurrentMusicStore';
import useMusicUtils from '@/features/MediaPlayer/composables/useMusicUtils';

const musicStore = useMusicStore();
const playlistStore = usePlaylistStore();
const currentMusicStore = useCurrentMusicStore();

const { audio, isPlaying, currentTime, duration } = storeToRefs(musicStore);
const { currentQueue } = storeToRefs(playlistStore);
const { currentAudioIndexInQueue } = storeToRefs(currentMusicStore);

const { toggleTrackPlaying, nextTrack, previousTrack, loadSongFromCurrentQueue } = useMusicUtils();
const {loadMetaData, autoTimeUpdate} = musicStore;

const userConfig = useUserSettings();
const { isShuffle, currentRepeatMode } = storeToRefs(userConfig);

onMounted(() => {
  loadMetaData();
  autoTimeUpdate(onMusicEnded);

  setInterval(() => {
    loadMetaData();
    autoTimeUpdate(onMusicEnded);
  }, 1500);
});

watch(audio, () => {
  loadMetaData();
});

async function onMusicEnded() {
  if (!currentAudioIndexInQueue.value) {
    return;
  }

  if (currentRepeatMode.value === 'repeatCurrentMusic') {
    return audio.value?.play();
  }

  if (isShuffle.value) {
    return loadSongFromCurrentQueue(
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

function timeUpdate(time: number) {
  audio.value!.currentTime = time;
  isPlaying.value = true;
}
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
        class="icon pointerable"
        @click="previousTrack()"
      />
      <button
        v-tooltip="isPlaying ? 'Остановить' : 'Слушать'"
        class="icon musicState pointerable"
        @click="toggleTrackPlaying()"
      >
        <PlayingState
          :state="isPlaying"
          class="icon"
        />
      </button>
      <Next
        v-tooltip="'Далее'"
        class="icon pointerable"
        @click="nextTrack()"
      />
      <Repeat
        :style="
          getActiveColor(currentRepeatMode !== 'onlyCurrentMusic', 'fill')
        "
        :state="currentRepeatMode === 'repeatCurrentMusic'"
        class="icon"
        @click="userConfig.toggleRepeatMode()"
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
        @on-value-change="timeUpdate"
        @mousedown="audio!.pause()"
        @mouseup="audio!.play()"
      />

      <div class="duration">
        {{ formatTime(duration) }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.track-controls {
  max-width: 722px;
  width: 40%;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .options {
    height: 32px;
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-bottom: 9px;

    .musicState {
      background-color: var(--white);
      border-radius: 50%;
      margin: 0 9px;
      transform: translate3d(0px, 0px, 0px);

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
  }

  .progress {
    height: 100%;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 6px;

    .range {
      flex: 1;
    }

    .currentTime,
    .duration {
      line-height: 1;
      color: var(--text-soft);
      font-size: .75rem;
      font-weight: 500;
    }
  }
}
</style>
