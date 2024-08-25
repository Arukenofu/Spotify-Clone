<script setup lang="ts">
import {nextTick, onMounted, ref} from "vue";
import type {Component} from "vue";

interface Props {
  is?: Component | string,
  gap?: string
}

withDefaults(defineProps<Props>(), {
  is: 'div',
  gap: '15px'
});

const isScrolled = ref<boolean>(false);

const block = ref<HTMLElement>();
const content = ref<HTMLElement>();
const scrollbar = ref<HTMLElement>();

const scrollTopModel = defineModel<number>();

function updateScrollBar() {
  const contentHeight = content.value!.scrollHeight;
  const customBlockHeight = block.value!.clientHeight;

  if (contentHeight <= customBlockHeight) {
    scrollbar.value!.style.display = 'none';
    isScrolled.value = false;

    return;
  }
  scrollbar.value!.style.display = 'block';

  const scrollbarHeight = (customBlockHeight / contentHeight) * customBlockHeight;
  const scrollTop = content.value!.scrollTop;
  const scrollbarTop = (scrollTop / contentHeight) * customBlockHeight;

  isScrolled.value = scrollTop !== 0;

  scrollTopModel.value = scrollTop;

  scrollbar.value!.style.height = `${scrollbarHeight}px`;
  scrollbar.value!.style.top = `${scrollbarTop}px`;
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

function initCustomScrollBar() {
  content.value!.addEventListener("scroll", updateScrollBar);
  updateScrollBar();

  scrollbar.value!.addEventListener("mousedown", onMouseDown);


  const observer = new MutationObserver(() => {
    nextTick(() => {
      updateScrollBar();
    });
  });

  observer.observe(content.value!, { childList: true, subtree: true });
}

onMounted(() => {
  initCustomScrollBar();
});
</script>

<template>
  <Component :is="is" class="scrollable-block" ref="block">
    <div class="scrollable-content" ref="content" :class="isScrolled && 'scrolled'">
      <slot></slot>
    </div>
    <div class="scrollbar" ref="scrollbar"></div>
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
    padding-right: v-bind("gap");
    scrollbar-width: none !important;
  }

  .scrollbar {
    z-index: 1;
  }

  &:hover .scrollbar {
    opacity: 1;
  }
}

.scrolled {
  box-shadow: inset 0 12px 9px -7px rgba(0, 0, 0, 0.58);
}
</style>