<script setup lang="ts">
import Range from "@/shared/components/Range.vue";
import RoundPlusIcon from "@/UI/Icons/Shared/RoundPlusIcon.vue";
import RandomOrder from "@/UI/Icons/MediaPlayer/RandomOrder.vue";
import Previous from "@/UI/Icons/MediaPlayer/Previous.vue";
import PlayingState from "@/UI/Icons/Shared/PlayingState.vue";
import Next from "@/UI/Icons/MediaPlayer/Next.vue";
import Repeat from "@/UI/Icons/MediaPlayer/Repeat.vue";
import useMusicStore from "@/features/MediaPlayer/store/useMusicStore";
import usePlaylistStore from "@/features/MediaPlayer/store/usePlaylistStore";
import useCurrentMusicStore from "@/features/MediaPlayer/store/useCurrentMusicStore";
import {storeToRefs} from "pinia";
import useMusicUtils from "@/features/MediaPlayer/composables/useMusicUtils";
import {useUserSettings} from "@/widgets/MediaPlayer/store/useUserSettings";
import {inject, onMounted, ref, watch} from "vue";
import getRandomNumber from "@/shared/utils/getRandomNumber";
import formatTimeMMSS from "../../../shared/utils/format/formatTimeMMSS";
import getActiveColor from "@/shared/utils/getActiveColor";
import ShowText from "@/UI/Icons/MediaPlayerControls/ShowText.vue";
import VolumeSilent from "@/UI/Icons/MediaPlayerControls/VolumeSilent.vue";
import Volume from "@/UI/Icons/MediaPlayerControls/Volume.vue";
import UnFullscreen from "@/UI/Icons/Shared/UnFullscreen.vue";

const musicStore = useMusicStore();
const playlistStore = usePlaylistStore();
const currentMusicStore = useCurrentMusicStore();

const { audio, isPlaying, currentTime, duration, volume } = storeToRefs(musicStore);
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

let timeoutId: ReturnType<typeof setTimeout> | null = null;
const isHover = ref<boolean>(false);

function onMouseMove() {
  clearTimeout(timeoutId!);
  isHover.value = true;

  timeoutId = setTimeout(() => {
    isHover.value = false;
  }, 2000)
}

function volumeUpdate(newVolume: number) {
  audio.value!.volume = newVolume;
  volume.value = newVolume;
}

function toggleVolume() {
  if (
      volume.value === 0 &&
      audio.value?.volume === 0 &&
      !localStorage.getItem('volumeCached')
  ) {
    audio.value!.volume = 1;
    volume.value = 1;

    return;
  }

  if (audio.value!.volume === 0) {
    audio.value!.volume = JSON.parse(localStorage.getItem('volumeCached')!);
    volume.value = JSON.parse(localStorage.getItem('volumeCached')!);
    localStorage.removeItem('volumeCached');

    return;
  }

  localStorage.setItem('volumeCached', JSON.stringify(volume.value));
  volume.value = 0;
  audio.value!.volume = 0;
}

const exitFullScreen = inject<void>('exitFullScreenFunc');
</script>

<template>
  <div class="controls" :class="isHover && 'onHover'" @mousemove="onMouseMove">
    <div class="controls-layout">
      <div class="timebar">
        <div class="current">
          {{formatTimeMMSS(currentTime)}}
        </div>
        <div class="progress">
          <Range
            class="range"
            :current="currentTime"
            :max="duration"
            :thumb-fix=".5"
            @on-value-change="timeUpdate"
            @mousedown="audio!.pause()"
            @mouseup="audio!.play()"
          />
        </div>
        <div class="duration">
          {{formatTimeMMSS(duration)}}
        </div>
      </div>

      <div class="options">
        <div class="add">
          <button class="addButton">
            <RoundPlusIcon class="icon" />
          </button>
        </div>
        <div class="main">
          <RandomOrder class="icon" @click="isShuffle = !isShuffle" />
          <Previous class="icon" @click="previousTrack()" />
          <button class="state" @click="toggleTrackPlaying()">
            <PlayingState class="icon" :state="isPlaying" />
          </button>
          <Next class="icon" @click="nextTrack()" />
          <Repeat
            class="icon"
            :state="currentRepeatMode === 'repeatCurrentMusic'"
            :style="getActiveColor(currentRepeatMode !== 'onlyCurrentMusic', 'fill')"
            @click="userConfig.toggleRepeatMode()"
          />
        </div>
        <div class="additional">
          <ShowText class="showText icon" />

          <div class="volume-option">
            <Volume
              v-if="volume !== 0"
              class="icon"
              @click="toggleVolume()"
            />
            <VolumeSilent
              v-else
              class="icon"
              @click="toggleVolume()"
            />

            <Range
              class="range"
              :max="1"
              :thumb-fix="6"
              :current="volume!"
              :step="0.01"
              @on-value-change="volumeUpdate"
            />
          </div>

          <button class="butt" @click="exitFullScreen!">
            <UnFullscreen
              class="unFullscreen"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.onHover {
  opacity: 1 !important;
}

.controls {
  font-size: .3vw;
  height: 100%;
  position: relative;
  transition: opacity .25s;
  will-change: opacity;
  z-index: 10;
  opacity: 0;

  .controls-layout {
    bottom: 10.5em;
    display: flex;
    left: 14.5em;
    position: absolute;
    right: 14.5em;
    flex-direction: column;

    .timebar {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      width: 100%;

      .progress {
        flex: 1;
        display: flex;
        align-items: center;
        height: 12px;

        .range {
          width: 100%;
        }
      }

      .current {
        min-width: 40px;
        text-align: right;
        font-size: 1rem;
        color: var(--white);
      }

      .duration {
        min-width: 40px;
        text-align: left;
        font-size: 1rem;
        color: var(--white);
      }

    }

    .options {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      height: 19.5em;

      .add {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 20px;

        .addButton {
          background-color: transparent;
          border: none;
          border-radius: 500px;
          cursor: pointer;
          position: relative;
          text-align: center;
          text-decoration: none;
          text-transform: none;
          touch-action: manipulation;
          transition-duration: 33ms;
          transition-property: background-color, border-color, color, box-shadow, filter, transform;
          user-select: none;
          vertical-align: middle;
          transform: translate3d(0px, 0px, 0px);
          color: var(--text-subdued,#656565);
          min-inline-size: 0;
          min-block-size: var(--encore-control-size-base,48px);
          padding-block: var(--encore-spacing-tighter,12px);
          padding-inline: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;

          &:hover .icon {
            scale: 1.04;
            fill: var(--white) !important;
          }

          .icon {
            fill: var(--text-soft);
            width: 24px;
            height: 24px;
          }
        }
      }

      .main {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;

        :deep(button), button {
          width: 32px;
          height: 32px;
          background-color: transparent;
          border: none;
          border-radius: 500px;
          display: grid;
          place-items: center;
          cursor: pointer;

          &:hover .icon, &:hover svg {
            scale: 1.04;
            fill: var(--white) !important;
          }

          .icon, svg {
            fill: var(--text-soft);
            width: 16px;
            height: 16px;
          }
        }

        .state {
          width: 56px;
          height: 56px;
          background-color: var(--white);

          &:hover {
            scale: 1.04;

            .icon {
              fill: var(--black) !important;
            }
          }

          .icon {
            width: 24px;
            height: 24px;
            fill: var(--black) !important;
          }
        }
      }

      .additional {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 20px;

        .showText {
          background: none;
          border: none;
          width: 32px;
          height: 32px;
          display: grid;
          place-items: center;

          &:hover {
            scale: 1.04;

            &:deep(svg) {
              fill: var(--white);
            }
          }

          &:deep(svg) {
            fill: var(--text-soft);
            width: 24px;
            height: 24px;
          }
        }

        .volume-option {
          display: flex;
          gap: 4px;
          align-items: center;
          width: 125px;

          button {
            width: 32px;
            height: 32px;
            background: none;
            border: none;
            display: grid;
            place-items: center;

            &:hover {
              scale: 1.04;

              :deep(svg) {
                fill: var(--white);
              }
            }

            :deep(svg) {
              fill: var(--text-soft);
              width: 16px;
              height: 16px;
            }
          }

          .range {
            width: 100%;
          }
        }

        .butt {
          background: none;
          border: none;
          width: 32px;
          height: 32px;
          display: grid;
          place-items: center;

          &:hover {
            scale: 1.04;

            &:deep(svg) {
              fill: var(--white);
            }
          }

          &:deep(svg) {
            fill: var(--text-soft);
            width: 24px;
            height: 24px;
          }
        }
      }
    }
  }
}
</style>