<script setup lang="ts">
import {nextTick, onMounted, onUnmounted, ref} from 'vue';
import type { Component } from 'vue';

interface Props {
  is?: Component | string;
  gap?: string;
  scrollbarWidth?: string;
  allowStyleShadow?: boolean;
}

withDefaults(defineProps<Props>(), {
  is: 'div',
  gap: '15px',
  scrollbarWidth: '12px',
  allowStyleShadow: true
});

const isScrolled = ref<boolean>(false);

const block = ref<HTMLElement>();
const content = ref<HTMLElement>();
const scrollbar = ref<HTMLElement>();

const scrollY = defineModel<number>();

defineExpose({
  content
});

let scrollBarOpacityTimeOut: ReturnType<typeof setTimeout>;

function updateScrollBar() {
  clearTimeout(scrollBarOpacityTimeOut);
  const contentHeight = content.value!.scrollHeight;
  const customBlockHeight = block.value!.clientHeight;

  if (contentHeight <= customBlockHeight) {
    scrollbar.value!.style.display = 'none';
    isScrolled.value = false;

    return;
  }
  scrollbar.value!.style.display = 'block';

  const scrollbarHeight =
    (customBlockHeight / contentHeight) * customBlockHeight;
  const scrollTop = content.value!.scrollTop;
  const scrollbarTop = (scrollTop / contentHeight) * customBlockHeight;

  isScrolled.value = scrollTop !== 0;

  scrollY.value = scrollTop;

  scrollbar.value!.style.height = `${scrollbarHeight}px`;
  scrollbar.value!.style.top = `${scrollbarTop}px`;

  scrollBarOpacityTimeOut = setTimeout(() => {
    scrollbar.value?.style.removeProperty('opacity');
  }, 800);
}

function onMouseDown(event: MouseEvent) {
  const startY = event.pageY;
  const startTop = parseInt(window.getComputedStyle(scrollbar.value!).top, 10);

  function onMouseMove(e: MouseEvent) {
    const deltaY = e.pageY - startY;
    const newTop = startTop + deltaY;
    const maxTop = block.value!.clientHeight - scrollbar.value!.clientHeight;
    const boundedTop = Math.max(0, Math.min(newTop, maxTop));

    scrollbar.value!.style.top = `${boundedTop}px`;

    const scrollPercent = boundedTop / block.value!.clientHeight;
    content.value!.scrollTop = scrollPercent * content.value!.scrollHeight;
  }

  function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

function scrollTo(event: MouseEvent) {
  const target = event.target as HTMLElement;
  const rect = target.getBoundingClientRect();

  const mouseY = event.clientY - rect.top;
  const contentHeight = content.value!.scrollHeight;
  const currentPercentage = mouseY / rect.height;

  const scrollTopCoordinate =
    (contentHeight * currentPercentage) - scrollbar.value!.offsetHeight;

  content.value!.scrollTo({
    top: scrollTopCoordinate,
    behavior: 'smooth'
  });
}

const mutationObserver = new MutationObserver(() => {
  nextTick(() => {
    updateScrollBar();
  })
})

onMounted(() => {
  updateScrollBar();
  mutationObserver.observe(content.value!, {childList: true, subtree: true});
});

onUnmounted(() => {
  mutationObserver.disconnect();
});
</script>

<template>
  <Component
    :is="is"
    ref="block"
    class="scrollable-block"
  >
    <div
      ref="content"
      class="scrollable-content"
      :class="isScrolled && allowStyleShadow && 'scrolled'"
      :style="`padding: 0 ${gap}`"
      @scroll="updateScrollBar"
    >
      <slot />
    </div>
    <div
      class="scrollbar-wrapper"
      @mousedown.self="scrollTo"
    >
      <div
        ref="scrollbar"
        class="scrollbar"
        @mousedown="onMouseDown"
      />
    </div>
  </Component>
</template>

<style lang="scss">
.scrollable-block {
  position: relative;
  overflow: hidden;
  height: 100%;

  .scrollable-content {
    max-height: 100%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-right: v-bind('gap');
    scrollbar-width: none !important;
  }

  .scrollbar-wrapper {
    height: 100%;
    right: 0;
    top: 0;
    width: v-bind(scrollbarWidth);
    position: absolute;
    z-index: 1 !important;

    .scrollbar {
      --scrollbar-bg: hsla(0, 0%, 100%, 0.3);
      --scrollbar-bg-hover: hsla(0, 0%, 100%, 0.5);
      --scrollbar-bg-active: hsla(0, 0%, 100%, 0.7);

      position: absolute;
      top: 0;
      right: 0;
      width: v-bind('scrollbarWidth');
      background-color: var(--scrollbar-bg);
      cursor: pointer;
      user-select: none;
      opacity: 0;
      transition: opacity 0.5s;

      &:hover {
        opacity: 1;
        background-color: var(--scrollbar-bg-hover);
      }

      &:active {
        opacity: 1;
        background-color: var(--scrollbar-bg-active);
      }
    }
  }

  &:hover .scrollbar {
    opacity: 1;
  }
}

.scrolled {
  box-shadow: inset 0 12px 9px -7px rgba(0, 0, 0, 0.58);
}
</style>
