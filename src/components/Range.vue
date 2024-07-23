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

  emit('onValueChange', parseFloat(target.value));
}

const emit = defineEmits<{
  onValueChange: [value: number]
}>()

</script>

<template>
  <div class="range-outer">
    <input :max="max" :step="step ?? 1" type="range" @input="updateCurrentValue($event)">
    <div class="range-progress" :style="`width: ${progress}%`" />

    <div class="thumb" :style="`left: ${progress - 1}%`" />
  </div>
</template>

<style scoped>

.range-outer {
  height: 4px;
  background-color: #4d4d4d;
  border-radius: 2px;
  position: relative;

  &:hover, &:active, &:focus {
    .range-progress {
      background-color: var(--main-color);
    }
    .thumb {
      opacity: 1;
    }
  }

  input {
    top: 0;
    left: 0;
    position: absolute;

    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    background: transparent;
    border: none;
    outline: none;

    width: 100%;
    height: 7px;

    z-index: 2;

    &::-webkit-slider-thumb {
      opacity: 0;
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
    background-color: var(--white);
    border-radius: 2px;
    width: 100%;
  }

  .thumb {
    opacity: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    height: 12px;
    border-radius: 50%;
    aspect-ratio: 1/1;
    background-color: var(--white);

  }
}

</style>