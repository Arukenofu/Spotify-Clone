<script setup lang="ts">
import Range from '@/shared/components/Range.vue'
import ConnectToDevice from '@/shared/UI/Icons/ConnectToDevice.vue'
import FullScreen from '@/shared/UI/Icons/FullScreen.vue'
import NowPlaying from '@/shared/UI/Icons/NowPlaying.vue'
import ShowQueue from '@/shared/UI/Icons/ShowQueue.vue'
import ShowText from '@/shared/UI/Icons/ShowText.vue'
import Volume from '@/shared/UI/Icons/Volume.vue'
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
