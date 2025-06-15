<script setup lang="ts">
import Range from '@/shared/components/Range.vue'
import Next from '@/shared/UI/Icons/Next.vue'
import PlayingState from '@/shared/UI/Icons/PlayingState.vue'
import Previous from '@/shared/UI/Icons/Previous.vue'
import RandomOrder from '@/shared/UI/Icons/RandomOrder.vue'
import Repeat from '@/shared/UI/Icons/Repeat.vue'
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
  max-width: 722px;
  width: 40%;
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
    margin-bottom: 9px;

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
      line-height: 1;
      color: var(--text-soft);
      font-size: .75rem;
      font-weight: 500;
    }
  }
}
</style>
