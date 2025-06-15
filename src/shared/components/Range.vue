<script setup lang="ts">
import { computed, ref, watch } from 'vue'

interface Props {
  current: number
  min?: number
  max: number
  step?: number

  thumbFix?: number
  disabled?: boolean

  useLocal?: boolean
  useTransition?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  step: 0.1,
  thumbFix: 2,
  useLocal: false,
})

const emit = defineEmits<{
  onValueChange: [value: number]
}>()

const localValue = ref(props.current)

const isDragging = ref(false)

watch(() => props.current, (value) => {
  if (!isDragging.value) {
    localValue.value = value
  }
})

const progress = computed(() => {
  const min = props.min || 0
  const max = props.max
  const current = localValue.value

  return ((current - min) / (max - min)) * 100
})

function onInput(event: Event) {
  const target = event.target as HTMLInputElement

  const value = props.min + (props.max - props.min) * (Number.parseFloat(target.value) / 100)

  localValue.value = Number(value)

  !props.useLocal && emit('onValueChange', localValue.value)
}

function onMouseDown() {
  isDragging.value = true
}

function onMouseUp() {
  isDragging.value = false
  emit('onValueChange', localValue.value)
}
</script>

<template>
  <div class="range-outer">
    <input
      min="0"
      max="100"
      :step="step"
      type="range"
      :value="progress"
      :disabled="disabled"
      @input="onInput"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
    >
    <div class="range-progress" />

    <div class="thumb" />
  </div>
</template>

<style lang="scss" scoped>
.range-outer {
  height: 4px;
  background-color: hsla(0, 0%, 100%, .3);
  border-radius: 2px;
  position: relative;

  --progress: calc(v-bind(progress) * 1%);

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
    width: var(--progress);
  }

  .thumb {
    opacity: 0;
    position: absolute;
    top: 1.6px;
    left: calc(var(--progress) - (v-bind(thumbFix) * 1%));
    transform: translateY(-50%);
    height: 12px;
    border-radius: 50%;
    aspect-ratio: 1/1;
    background-color: var(--white);
  }
}
</style>
