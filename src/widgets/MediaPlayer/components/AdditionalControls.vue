<script setup lang="ts">
import { inject } from 'vue'
import { useI18n } from 'vue-i18n'
import { Tippy } from 'vue-tippy'
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
      <Tippy class="main-state-container" :content="t('media-player.nowPlaying')">
        <NowPlaying
          class="icon"
          :class="currentPanelName === 'CurrentTrackInfo' && 'active'"
          @click="setNewPanel('CurrentTrackInfo')"
        />
      </Tippy>

      <Tippy :content="t('media-player.lyrics')">
        <ShowText
          class="icon"
          :class="currentRoutePath === '/lyrics' && 'active'"
          @click="toggleLyricsPage"
        />
      </Tippy>

      <Tippy :content="t('media-player.queue')">
        <ShowQueue
          :class="currentPanelName === 'CurrentPlaylistQueue' && 'active'"
          class="icon"
          @click="setNewPanel('CurrentPlaylistQueue')"
        />
      </Tippy>

      <Tippy :content="t('media-player.connect')">
        <ConnectToDevice
          :class="currentPanelName === 'ConnectToDevice' && 'active'"
          class="icon"
          @click="setNewPanel('ConnectToDevice')"
        />
      </Tippy>

      <div class="volume-option">
        <Tippy v-if="volume !== 0" :content="t('media-player.disableVoice')">
          <Volume
            class="icon"
            @click="toggleVolume(volume, setVolume)"
          />
        </Tippy>
        <Tippy v-else :content="t('media-player.enableVoice')">
          <VolumeSilent
            class="icon"
            @click="toggleVolume(volume, setVolume)"
          />
        </Tippy>
        <Range
          class="range"
          :max="1"
          :thumb-fix="6"
          :current="volume!"
          :step="0.01"
          @on-value-change="setVolume"
        />
      </div>

      <Tippy :content="t('media-player.fullscreen')">
        <FullScreen
          class="icon"
          @click="enableFullScreenFunc!"
        />
      </Tippy>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.additional-controls {
  min-width: 180px;
  width: 30%;

  .options {
    display: flex;

    .main-state-container:first-child {
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
