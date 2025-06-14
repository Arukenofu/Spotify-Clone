<script setup lang="ts">
import {computed, reactive,} from "vue";
import {useI18n} from "vue-i18n";
import RandomOrder from '@/shared/UI/Icons/RandomOrder.vue';
import Previous from '@/shared/UI/Icons/Previous.vue';
import PlayingState from '@/shared/UI/Icons/PlayingState.vue';
import Next from '@/shared/UI/Icons/Next.vue';
import Repeat from '@/shared/UI/Icons/Repeat.vue';
import Range from '@/shared/components/Range.vue';
import getActiveColor from '@/shared/utils/colors/getActiveColor';
import formatTime from '@/shared/utils/format/formatTimeMMSS';
import {useAudioStream, usePlaybackControls} from "@/features/MediaPlayer";
import {userPreferencesStore} from "@/features/UserPreferences";

const {t} = useI18n();

const preferences = userPreferencesStore();

const stream = reactive(useAudioStream());
const controls = reactive(usePlaybackControls());

const repeatModeTooltip = computed(() => {
  if (preferences.currentRepeatMode === 'onlyCurrentMusic') {
    return t('media-player.repeat');
  }

  if (preferences.currentRepeatMode === 'repeatCurrentPlaylist') {
    return t('media-player.repeatOnlyOne');
  }

  return t('media-player.repeatStop');
});
</script>

<template>
  <div class="track-controls">
    <div class="options">
      <RandomOrder
        v-tooltip="preferences.isShuffle ? t('media-player.shuffleDisable') : t('media-player.shuffleEnable')"
        class="icon"
        :style="getActiveColor(preferences.isShuffle, 'fill')"
        @click="preferences.toggleIsShuffle"
      />
      <Previous
        v-tooltip="t('media-player.previous')"
        class="icon pointerable"
        @click="controls.previousTrack"
      />
      <button
        v-tooltip="stream.isPlaying ? t('music-actions.pauseMusic') : t('music-actions.playMusic')"
        class="icon musicState pointerable"
        @click="controls.toggleCurrentTrack"
      >
        <PlayingState
          :state="stream.isPlaying"
          class="icon"
        />
      </button>
      <Next
        v-tooltip="t('media-player.next')"
        class="icon pointerable"
        @click="controls.nextTrack"
      />
      <Repeat
        v-tooltip="repeatModeTooltip"
        :style="
          getActiveColor(preferences.currentRepeatMode !== 'onlyCurrentMusic', 'fill')
        "
        :state="preferences.currentRepeatMode === 'repeatCurrentMusic'"
        class="icon"
        @click="preferences.toggleRepeatMode()"
      />
    </div>

    <div class="progress">
      <div class="currentTime">
        {{formatTime(stream.currentTime)}}
      </div>

      <Range
        class="range"
        :current="stream.currentTime"
        :max="stream.duration"
        :thumb-fix="1.5"
        use-local
        @on-value-change="stream.seek"
        @mousedown="stream.pause()"
        @mouseup="stream.play()"
      />

      <div class="duration">
        {{formatTime(stream.duration)}}
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
      width: 24px;
      max-width: 24px;
      line-height: 1;
      color: var(--text-soft);
      font-size: .75rem;
      font-weight: 500;
    }
  }
}
</style>
