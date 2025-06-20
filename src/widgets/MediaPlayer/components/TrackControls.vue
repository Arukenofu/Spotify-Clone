<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { Tippy } from 'vue-tippy'
import { useAudioStream, usePlaybackControls } from '@/features/MediaPlayer'
import { userPreferencesStore } from '@/features/UserPreferences'
import Range from '@/shared/components/Range.vue'
import Next from '@/shared/UI/Icons/Next.vue'
import PlayingState from '@/shared/UI/Icons/PlayingState.vue'
import Previous from '@/shared/UI/Icons/Previous.vue'
import RandomOrder from '@/shared/UI/Icons/RandomOrder.vue'
import Repeat from '@/shared/UI/Icons/Repeat.vue'
import getActiveColor from '@/shared/utils/colors/getActiveColor'
import formatTimeMMSS from '@/shared/utils/format/formatTimeMMSS.ts'

const { t } = useI18n()

const preferences = userPreferencesStore()

const stream = reactive(useAudioStream())
const controls = reactive(usePlaybackControls())

const repeatModeTooltip = computed(() => {
  if (preferences.currentRepeatMode === 'onlyCurrentMusic') {
    return t('media-player.repeat')
  }

  if (preferences.currentRepeatMode === 'repeatCurrentPlaylist') {
    return t('media-player.repeatOnlyOne')
  }

  return t('media-player.repeatStop')
})
</script>

<template>
  <div class="track-controls">
    <div class="options">
      <Tippy :content="preferences.isShuffle ? t('media-player.shuffleDisable') : t('media-player.shuffleEnable')">
        <RandomOrder
          class="icon"
          :style="getActiveColor(preferences.isShuffle, 'fill')"
          @click="preferences.toggleIsShuffle"
        />
      </Tippy>

      <Tippy :content="t('media-player.previous')">
        <Previous
          class="icon pointerable"
          @click="controls.previousTrack"
        />
      </Tippy>

      <Tippy :content="stream.isPlaying ? t('music-actions.pauseMusic') : t('music-actions.playMusic')">
        <button
          class="icon musicState pointerable"
          @click="controls.toggleCurrentTrack"
        >
          <PlayingState
            :state="stream.isPlaying"
            class="icon"
          />
        </button>
      </Tippy>

      <Tippy :content="t('media-player.next')">
        <Next
          class="icon pointerable"
          @click="controls.nextTrack"
        />
      </Tippy>

      <Tippy :content="repeatModeTooltip">
        <Repeat
          :style="getActiveColor(preferences.currentRepeatMode !== 'onlyCurrentMusic', 'fill')"
          :state="preferences.currentRepeatMode === 'repeatCurrentMusic'"
          class="icon"
          @click="preferences.toggleRepeatMode()"
        />
      </Tippy>
    </div>

    <div class="progress">
      <div class="currentTime">
        {{ formatTimeMMSS(stream.currentTime) }}
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
        {{ formatTimeMMSS(stream.duration) }}
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
