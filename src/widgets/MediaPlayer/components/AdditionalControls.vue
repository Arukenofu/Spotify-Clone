<script setup lang="ts">
import Range from "@/shared/components/Range.vue";
import ShowQueue from "@/UI/Icons/MediaPlayerControls/ShowQueue.vue";
import FullScreen from "@/UI/Icons/MediaPlayerControls/FullScreen.vue";
import ShowText from "@/UI/Icons/MediaPlayerControls/ShowText.vue";
import ConnectToDevice from "@/UI/Icons/MediaPlayerControls/ConnectToDevice.vue";
import Volume from "@/UI/Icons/MediaPlayerControls/Volume.vue";
import VolumeSilent from "@/UI/Icons/MediaPlayerControls/VolumeSilent.vue";
import NowPlaying from "@/UI/Icons/MediaPlayerControls/NowPlaying.vue";

import {storeToRefs} from "pinia";
import {useUserSettings} from "@/widgets/MediaPlayer/store/useUserSettings";
import {useMusicStore} from "@/features/MediaPlayer";
import {infoPanel} from '@/features/InfoPanel'

const musicStore = useMusicStore();
const {audio} = storeToRefs(musicStore);

const userConfig = useUserSettings();
const {volume} = storeToRefs(userConfig);

const {currentPanelName, setNewPanel} = infoPanel()

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

</script>

<template>
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
          :class="currentPanelName === 'CurrentPlaylistQueue' && 'active'"
          @click="setNewPanel('CurrentPlaylistQueue')"
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
          class="icon"
          v-tooltip.top_left="'На весь экран'"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
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