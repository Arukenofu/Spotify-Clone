<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  maxWidth: number;
  minWidth: number;
  fromRight?: boolean;
}

type Emits = {
  customResizeEvent: [newWidth: number, max: number, min: number];
};

const props = withDefaults(defineProps<Props>(), {
  fromRight: false
});

const resizableWidth = defineModel<number>('currentWidth', {
  required: true
});

const emit = defineEmits<Emits>();

const isResizing = ref<boolean>(false);
const initialWidth = ref<number>(0);

function initializeResize(): void {
  isResizing.value = true;
  initialWidth.value = resizableWidth.value;

  document.addEventListener('mousemove', resize);
  document.addEventListener('mouseup', stopResize);
}

function resize(event: MouseEvent): void {
  if (!isResizing.value) return;

  const mouseX = event.clientX;
  let newWidth = initialWidth.value + (mouseX - initialWidth.value);

  if (props.fromRight) {
    newWidth = window.innerWidth - newWidth;
  }

  if (newWidth >= props.minWidth && newWidth <= props.maxWidth) {
    resizableWidth.value = newWidth - 10;
  }

  document.documentElement.style.userSelect = 'none';
  emit('customResizeEvent', newWidth, props.maxWidth, props.minWidth);
}

function stopResize(): void {
  isResizing.value = false;
  document.documentElement.style.userSelect = 'auto';

  document.removeEventListener('mousemove', resize);
  document.removeEventListener('mouseup', stopResize);
}
</script>

<template>
  <div
    class="resizer"
    :class="isResizing && 'active'"
    @mousedown="initializeResize()"
  />
</template>

<style lang="scss" scoped>
.resizer {
  width: var(--layout-gap);
  transition:
    background-color 0.15s ease-out,
    opacity 0.25s ease-out;
  display: grid;
  place-items: center;
  cursor: grab;
  opacity: 0;

  &:hover {
    opacity: 1;
  }

  &::after {
    content: '';
    display: block;
    width: 1px;
    background-color: #727272;
    height: calc(100% - 16px);
  }
}

.active {
  opacity: 1;

  &::after {
    background-color: var(--white);
  }
}
</style>
