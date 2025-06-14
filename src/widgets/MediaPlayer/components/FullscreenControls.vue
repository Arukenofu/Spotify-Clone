<script setup lang="ts">
import {inject, reactive, ref} from "vue";
import formatTimeMMSS from "@/shared/utils/format/formatTimeMMSS";
import getActiveColor from "@/shared/utils/colors/getActiveColor";
import {useAudioStream, usePlaybackControls} from "@/features/MediaPlayer";
import {toggleVolume} from "@/widgets/MediaPlayer/shared/toggleVolume";
import Range from "@/shared/components/Range.vue";
import RoundPlusIcon from "@/shared/UI/Icons/RoundPlusIcon.vue";
import RandomOrder from "@/shared/UI/Icons/RandomOrder.vue";
import Previous from "@/shared/UI/Icons/Previous.vue";
import PlayingState from "@/shared/UI/Icons/PlayingState.vue";
import Next from "@/shared/UI/Icons/Next.vue";
import Repeat from "@/shared/UI/Icons/Repeat.vue";
import ShowText from "@/shared/UI/Icons/ShowText.vue";
import VolumeSilent from "@/shared/UI/Icons/VolumeSilent.vue";
import Volume from "@/shared/UI/Icons/Volume.vue";
import UnFullscreen from "@/shared/UI/Icons/UnFullscreen.vue";
import {userPreferencesStore} from "@/features/UserPreferences";

const stream = reactive(useAudioStream());
const controls = reactive(usePlaybackControls());

const preferences = userPreferencesStore();

let timeoutId: ReturnType<typeof setTimeout> | null = null;
const isHover = ref<boolean>(false);

onMouseMove();

function onMouseMove() {
  clearTimeout(timeoutId!);
  isHover.value = true;

  timeoutId = setTimeout(() => {
    isHover.value = false;
  }, 2000);
}

const exitFullScreen = inject<void>('exitFullScreenFunc');
</script>

<template>
  <div class="controls" :class="isHover && 'onHover'" @mousemove="onMouseMove">
    <div class="controls-layout">
      <div class="timebar">
        <div class="current">
          {{formatTimeMMSS(stream.currentTime)}}
        </div>
        <div class="progress">
          <Range
            class="range"
            :current="stream.currentTime"
            :max="stream.duration"
            :thumb-fix=".5"
            use-local
            @on-value-change="stream.seek"
            @mousedown="stream.pause()"
            @mouseup="stream.play()"
          />
        </div>
        <div class="duration">
          {{formatTimeMMSS(stream.duration)}}
        </div>
      </div>

      <div class="options">
        <div class="add">
          <button class="addButton">
            <RoundPlusIcon class="icon" />
          </button>
        </div>
        <div class="main">
          <RandomOrder class="icon" @click="preferences.toggleIsShuffle" />
          <Previous class="icon" @click="controls.previousTrack" />
          <button class="state" @click="controls.toggleCurrentTrack">
            <PlayingState class="icon" :state="stream.isPlaying" />
          </button>
          <Next class="icon" @click="controls.nextTrack" />
          <Repeat
            class="icon"
            :state="preferences.currentRepeatMode === 'repeatCurrentMusic'"
            :style="getActiveColor(preferences.currentRepeatMode !== 'onlyCurrentMusic', 'fill')"
            @click="preferences.toggleRepeatMode"
          />
        </div>
        <div class="additional">
          <ShowText class="showText icon" />

          <div class="volume-option">
            <Volume
              v-if="stream.volume !== 0"
              class="icon"
              @click="toggleVolume(stream.volume, stream.setVolume)"
            />
            <VolumeSilent
              v-else
              class="icon"
              @click="toggleVolume(stream.volume, stream.setVolume)"
            />

            <Range
              class="range"
              :max="1"
              :thumb-fix="6"
              :current="stream.volume"
              :step="0.01"
              @on-value-change="stream.setVolume"
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