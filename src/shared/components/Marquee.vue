<script setup lang="ts">
import {onMounted, ref, useTemplateRef} from "vue";

interface Props {
  scrollSpeed?: number;
  iterationCount?: number;
}
type Direction = 'toLeft' | 'toRight';

const {
  scrollSpeed = .1,
  iterationCount = Infinity
} = defineProps<Props>();

const marquee = useTemplateRef('marquee');
const remainingWidth = ref<number | null>(null);

const transformX = ref<number>(0);

onMounted(() => {
  const showingContentWidth = marquee.value!.offsetWidth;
  const fullContentWidth = marquee.value!.scrollWidth;

  remainingWidth.value = fullContentWidth - showingContentWidth;
})

let direction: Direction = 'toLeft';
let isPaused = false;
let currentIterationCount = 0;

let activeAnimationFrame: number | null = null;

function scrollMarquee() {
  if (isPaused || !remainingWidth.value) return;
  if (iterationCount === currentIterationCount) {
    currentIterationCount = 0;
    activeAnimationFrame = null;
    return;
  }

  if (direction === 'toLeft') {
    transformX.value -= scrollSpeed;

    if (transformX.value <= -(remainingWidth.value + 10)) {
      onDirectionEnd('toRight');
    }
  } else {
    transformX.value += scrollSpeed;

    if (transformX.value >= 0) {
      onDirectionEnd('toLeft')
    }
  }

  activeAnimationFrame = requestAnimationFrame(scrollMarquee)
}

function startMarquee() {
  if (activeAnimationFrame) {
    cancelAnimationFrame(activeAnimationFrame);
  }

  activeAnimationFrame = null;
  scrollMarquee();
}

function onDirectionEnd(newDirection: Direction) {
  isPaused = true;
  currentIterationCount++;

  setTimeout(() => {
    direction = newDirection;
    isPaused = false;
    scrollMarquee();
  }, 1000);
}
</script>

<template>
  <div ref="marquee" class="v-marquee" :class="remainingWidth && 'v-mask'">
    <div ref="content" class="content" :style="`--translateX: ${transformX}px`">
      <slot :start-marquee="startMarquee" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.v-marquee {
  margin-left: -6px;

  .content {
    transform: translateX(var(--translateX));
    width: fit-content;
  }
}

.v-mask {
  mask-image: linear-gradient(
    to right,
    transparent 0,
    #000 6px,
    #000 calc(100% - 12px),
    transparent 100%,
  );
}
</style>