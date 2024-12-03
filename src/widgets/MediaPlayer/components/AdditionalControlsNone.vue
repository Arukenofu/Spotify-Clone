<script setup lang="ts">
import NowPlaying from '@/UI/Icons/MediaPlayerControls/NowPlaying.vue';
import FullScreen from '@/UI/Icons/MediaPlayerControls/FullScreen.vue';
import Range from '@/shared/components/Range.vue';
import Volume from '@/UI/Icons/MediaPlayerControls/Volume.vue';
import ShowText from '@/UI/Icons/MediaPlayerControls/ShowText.vue';
import ConnectToDevice from '@/UI/Icons/MediaPlayerControls/ConnectToDevice.vue';
import ShowQueue from '@/UI/Icons/MediaPlayerControls/ShowQueue.vue';
</script>

<template>
  <div class="additional-controls">
    <div class="options">
      <NowPlaying
        class="icon"
      />

      <ShowText
        class="icon"
      />

      <ShowQueue
        class="icon"
      />

      <ConnectToDevice
        class="icon"
      />

      <div class="volume-option">
        <Volume
          class="icon"
        />

        <Range
          class="range"
          :max="1"
          :thumb-fix="6"
          :current="0"
          :disabled="true"
        />
      </div>

      <FullScreen
        class="icon"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.additional-controls {
  min-width: 180px;
  width: 30%;
  pointer-events: none;

  .options {
    display: flex;

    .icon:first-child {
      margin-left: auto;
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