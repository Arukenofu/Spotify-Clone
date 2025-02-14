<script setup lang="ts">
import {computed, ref, useTemplateRef} from "vue";
import RoundButton from "@/shared/UI/Buttons/RoundButton.vue";
import ArrowIcon2 from "@/shared/UI/Icons/ArrowIcon2.vue";

const {isScrollable = true} = defineProps<{
  isScrollable?: boolean;
}>();

const scrollableSectionRef = useTemplateRef('scrollableSectionRef');

const canItScrollLeft = ref<boolean>(false);
const canItScrollRight = ref<boolean>(true);

const computeRootElementShadowClasses = computed(() => ([
    canItScrollLeft.value && 'shadow-left',
    canItScrollRight.value && 'shadow-right'
]));

function onScroll() {
  const section = scrollableSectionRef.value;
  if (!section) return;

  const scrollLeft = section.scrollLeft;
  const maxScrollLeft = section.scrollWidth - section.clientWidth;

  canItScrollLeft.value = scrollLeft > 0;
  canItScrollRight.value = scrollLeft !== maxScrollLeft;
}

function onScrollButtonClick(direction: 'left' | 'right') {
  const section = scrollableSectionRef.value;
  if (!section) return;

  const applicator = direction === 'left' ? -585 : 585;

  section.scrollTo({
    left: section.scrollLeft + applicator,
    behavior: 'smooth'
  });
}
</script>

<template>
  <div v-if="isScrollable" class="v-section" :class="computeRootElementShadowClasses">
    <div
      ref="scrollableSectionRef"
      class="v-scrollable-section"
      @scroll="onScroll()"
    >
      <div class="inner-section">
        <slot />
      </div>
    </div>

    <div class="scroll-control-mask">
      <RoundButton
        class="button button-left"
        :class="!canItScrollLeft && 'hidden'"
        @click="onScrollButtonClick('left')"
      >
        <ArrowIcon2 class="icon icon-left" />
      </RoundButton>

      <RoundButton
        class="button button-right"
        :class="!canItScrollRight && 'hidden'"
        @click="onScrollButtonClick('right')"
      >
        <ArrowIcon2 class="icon icon-right" />
      </RoundButton>
    </div>
  </div>

  <div v-else class="v-section-static">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.v-section {
  margin-inline: -24px;
  position: relative;

  .v-scrollable-section {
    padding-left: 24px;
    overflow-x: scroll;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    scrollbar-width: none;
    overscroll-behavior-x: contain;

    .inner-section {
      display: grid;
      grid-auto-flow: column;
      grid-template-rows: repeat(1, auto);
      width: 100%;
    }
  }

  .scroll-control-mask {
    top: 0;
    left: 0;
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;

    .hidden {
      opacity: 0 !important;
    }

    .button {
      top: 50%;
      position: relative;
      width: 32px;
      height: 32px;
      background-color: var(--ui-highlight);
      margin-top: -16px;
      transition: all .15s ease-out;
      opacity: 0;
      z-index: 2;

      &:hover {
        background-color: #2a2a2a;

        .icon {
          opacity: 1;
        }
      }

      .icon {
        width: 16px;
        height: 16px;
        fill: var(--white);
        opacity: .7;
      }

      .icon-left {
        transform: rotate(180deg);
      }
    }
  }

  .v-scrollable-section:hover ~ .scroll-control-mask,
  .scroll-control-mask:hover {
    .button {
      opacity: 1;
    }
    .button-right {
      translate: -8px;
    }
    .button-left {
      translate: 8px;
    }
  }

  &::before, &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 120px;
    height: 100%;
    z-index: 1;
    pointer-events: none;

    opacity: 0;
  }

  &::before {
    left: 0;
    background: linear-gradient(
            90deg,
            hsla(0, 0%, 7%, .7) 0,
            transparent 100%
    );
    inset-inline-start: 0;
  }

  &::after {
    right: 0;
    background: linear-gradient(
            -90deg,
            hsla(0, 0%, 7%, .7) 0,
            transparent 100%
    );
    inset-inline-end: 0;
  }
}

.shadow-left::before, .shadow-right::after {
  opacity: 1;
}

.v-section-static {
  margin-inline: -12px;
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
          minmax(180px, 1fr)
  );
  grid-template-rows: repeat(1, minmax(0, 1fr));
}
</style>