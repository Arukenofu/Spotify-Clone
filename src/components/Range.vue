<script setup lang="ts">

import {computed} from "vue";

const props = defineProps<{
  max: number,
  step?: number
}>();

const current = defineModel<number>('current',{
  required: true
});

const progress = computed(() => {
  return (current.value / props.max) * 100
});

function updateCurrentValue(event: Event) {
  const target = event.target as HTMLInputElement;
  current.value = parseFloat(target.value);
}

</script>

<template>
  <div class="range-outer">
    <input :max="max" :step="step ?? 1" type="range" @input="updateCurrentValue($event)">
    <div class="range-progress" :style="`width: ${progress}%`" />
  </div>
</template>

<style scoped>

.range-outer {
  height: 4px;
  background-color: #484848;
  cursor: pointer;
  border-radius: 2px;
  position: relative;

  input {
    top: 0;
    left: 0;
    position: absolute;
    cursor: pointer;

    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    background: transparent;
    border: none;
    outline: none;

    width: 100%;
    height: 7px;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
    }

    &::-moz-range-thumb {
      width: 0;
      border: none;
      box-sizing: border-box;
    }

    &::-ms-thumb {
      appearance: none;
      width: 0;
      border: none;
    }

    &::-webkit-slider-runnable-track {
      -webkit-appearance: none;
      appearance: none;
      height: 0;
      width: 0;
    }

    &::-moz-range-track {
      -moz-appearance: none;
      appearance: none;
      height: 0;
      width: 0;
    }

    &::-ms-track {
      appearance: none;
      background: transparent;
      border-color: transparent;
      color: transparent;
      height: 0;
      width: 0;
    }
  }

  .range-progress {
    height: 100%;
    background-color: #45dc60;
    border-radius: 2px;
  }
}

</style>