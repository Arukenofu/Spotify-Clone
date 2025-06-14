<script setup lang="ts">
import { inject } from 'vue'
import { useI18n } from 'vue-i18n'
import { router } from '@/app/router'
import { infoPanel } from '@/features/InfoPanel'
import { useAudioStream } from '@/features/MediaPlayer'
import Range from '@/shared/components/Range.vue'
import useCurrentRoutePath from '@/shared/composables/useCurrentRoutePath'
import ConnectToDevice from '@/shared/UI/Icons/ConnectToDevice.vue'
import FullScreen from '@/shared/UI/Icons/FullScreen.vue'
import NowPlaying from '@/shared/UI/Icons/NowPlaying.vue'
import ShowQueue from '@/shared/UI/Icons/ShowQueue.vue'
import ShowText from '@/shared/UI/Icons/ShowText.vue'
import Volume from '@/shared/UI/Icons/Volume.vue'
import VolumeSilent from '@/shared/UI/Icons/VolumeSilent.vue'
import { toggleVolume } from '@/widgets/MediaPlayer/shared/toggleVolume'

const { t } = useI18n()

const { setVolume, volume } = useAudioStream()

const { currentPanelName, setNewPanel } = infoPanel()

const { currentRoutePath } = useCurrentRoutePath('path')

function toggleLyricsPage() {
  if (currentRoutePath.value !== '/lyrics') {
    router.push('/lyrics')
  }
  else {
    router.back()
  }
}

const enableFullScreenFunc = inject<void>('enableFullScreenFunc')
</script>

<template>
  <div class="additional-controls">
    <div class="options">
      <NowPlaying
        v-tooltip="t('media-player.nowPlaying')"
        class="icon"
        :class="currentPanelName === 'CurrentTrackInfo' && 'active'"
        @click="setNewPanel('CurrentTrackInfo')"
      />

      <ShowText
        v-tooltip="t('media-player.lyrics')"
        class="icon"
        :class="currentRoutePath === '/lyrics' && 'active'"
        @click="toggleLyricsPage"
      />

      <ShowQueue
        v-tooltip="t('media-player.queue')"
        :class="currentPanelName === 'CurrentPlaylistQueue' && 'active'"
        class="icon"
        @click="setNewPanel('CurrentPlaylistQueue')"
      />

      <ConnectToDevice
        v-tooltip="t('media-player.connect')"
        :class="currentPanelName === 'ConnectToDevice' && 'active'"
        class="icon"
        @click="setNewPanel('ConnectToDevice')"
      />

      <div class="volume-option">
        <Volume
          v-if="volume !== 0"
          v-tooltip="t('media-player.disableVoice')"
          class="icon"
          @click="toggleVolume(volume, setVolume)"
        />
        <VolumeSilent
          v-else
          v-tooltip="t('media-player.enableVoice')"
          class="icon"
          @click="toggleVolume(volume, setVolume)"
        />

        <Range
          class="range"
          :max="1"
          :thumb-fix="6"
          :current="volume!"
          :step="0.01"
          @on-value-change="setVolume"
        />
      </div>

      <FullScreen
        v-tooltip="t('media-player.fullscreen')"
        class="icon"
        @click="enableFullScreenFunc!"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.additional-controls {
  min-width: 180px;
  width: 30%;

  .options {
    display: flex;

    .icon:first-child {
      margin-left: auto;
    }

    .icon {
      width: 32px;
      cursor: pointer;
    }

    .active:deep(svg) {
      fill: var(--main-color);
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
</style>
