<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  current: number;
  min?: number;
  max: number;
  step?: number;
  thumbFix?: number;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  step: 1,
  thumbFix: 2
});

const progress = computed(() => {
  const min = props.min || 0;
  const max = props.max;
  const current = props.current;

  return ((current - min) / (max - min)) * 100;
});

function updateCurrentValue(event: Event) {
  const target = event.target as HTMLInputElement;
  const value =
    props.min + (props.max - props.min) * (parseFloat(target.value) / 100);

  emit('onValueChange', value);
}

const emit = defineEmits<{
  onValueChange: [value: number];
}>();
</script>

<template>
  <div class="range-outer">
    <input
      min="0"
      max="100"
      :step="step ?? 1"
      type="range"
      :value="progress"
      :disabled="disabled"
      @input="updateCurrentValue($event)"
    >
    <div
      class="range-progress"
      :style="`width: ${progress}%`"
    />

    <div
      class="thumb"
      :style="`left: ${progress - thumbFix}%`"
    />
  </div>
</template>

<style lang="scss" scoped>
.range-outer {
  height: 4px;
  background-color: hsla(0, 0%, 100%, .3);
  border-radius: 2px;
  position: relative;

  &:hover,
  &:active,
  &:focus {
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
    width: 0;
  }

  .thumb {
    opacity: 0;
    position: absolute;
    top: 1.6px;
    transform: translateY(-50%);
    left: calc(v-bind('progress'));
    height: 12px;
    border-radius: 50%;
    aspect-ratio: 1/1;
    background-color: var(--white);
  }
}
</style>
