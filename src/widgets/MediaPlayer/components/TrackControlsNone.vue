<script setup lang="ts">
import Previous from '@/UI/Icons/MediaPlayer/Previous.vue';
import RandomOrder from '@/UI/Icons/MediaPlayer/RandomOrder.vue';
import Repeat from '@/UI/Icons/MediaPlayer/Repeat.vue';
import PlayingState from '@/UI/Icons/Shared/PlayingState.vue';
import Next from '@/UI/Icons/MediaPlayer/Next.vue';
import Range from '@/shared/components/Range.vue';
</script>

<template>
  <div class="track-controls">
    <div class="options">
      <RandomOrder
        class="icon"
      />
      <Previous
        class="icon"
      />
      <button
        class="icon musicState"
      >
        <PlayingState
          class="icon"
        />
      </button>
      <Next
        class="icon"
      />
      <Repeat
        class="icon"
        :state="false"
      />
    </div>

    <div class="progress">
      <div class="currentTime">
        --:--
      </div>
      <Range
        class="range"
        :current="0"
        :max="1"
        :thumb-fix="1"
        :disabled="true"
      />
      <div class="duration">
        --:--
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.track-controls {
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  pointer-events: none;

  .options {
    height: 32px;
    display: flex;
    justify-content: center;
    gap: 8px;

    .musicState {
      background-color: var(--white);
      border-radius: 50%;
      margin: 0 9px;

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
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 6px;

    .range {
      flex: 1;
    }

    .currentTime,
    .duration {
      position: relative;
      top: 1px;
      line-height: 0;
      color: var(--text-soft);
      font-size: 1rem;
      font-weight: 500;
      font-family: 'Zain', sans-serif;
    }
  }
}
</style>