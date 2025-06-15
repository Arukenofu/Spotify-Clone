<script setup lang="ts">
import type { HeaderProps } from '@/pageLayouts/artist.id/props/HeaderProps'
import { computed, inject, ref } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps<HeaderProps>()

const { t } = useI18n()

const layoutScrollY = inject('layoutScrollY', ref(0))

const scrollPercentage = computed(() => {
  if (layoutScrollY.value > 500) {
    return 0.37
  }

  return (layoutScrollY.value / (600))
})
</script>

<template>
  <div class="parallax" :style="`--scroll: ${scrollPercentage}`">
    <div class="image" :style="`background-image: url('${coverImage}')`" />
    <div class="mask" />
  </div>
  <div class="info-layout">
    <h1 class="artist-name">
      {{ name }}
    </h1>
    <span class="artist-listeners-quantity">
      {{ t('social.countPerMonth', [t('social.listeners', listenersPerMonth)]) }}
    </span>
  </div>
</template>

<style scoped lang="scss">
.parallax {
  width: 100%;
  position: relative;

  .image, .mask {
    display: block;
    height: 38vh;
    position: absolute;
    inset: 0;
    top: 0;
    left: 0;
    width: 100%;
    content-visibility: auto;
    contain: strict;
  }

  .image {
    animation: backgroundAnimation 1s linear;
    animation-delay: calc(var(--scroll) * -1s);
    animation-fill-mode: both;
    animation-iteration-count: 1;
    animation-play-state: paused;
    background-attachment: scroll;
    background-position: 50% 15%;
    background-repeat: no-repeat;
    background-size: cover;
    transform: scale(1.1);
  }

  .mask {
    background: linear-gradient(transparent 0,rgba(0,0,0,.5) 100%), var(--background-noise);
    transform: scale(1.1);
    --bgColor: v-bind(mask);

    &::after {
      animation: overlayAnimation 1s linear;
      animation-iteration-count: 1;
      animation-delay: calc(var(--scroll) * -1s);
      animation-fill-mode: both;
      animation-play-state: paused;
      background-image: linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.6)),linear-gradient(var(--bgColor),var(--bgColor));
      content: "";
      height: 40vh;
      left: 0;
      min-height: 340px;
      opacity: 0;
      position: absolute;
      right: 0;
    }
  }
}

@keyframes backgroundAnimation {
  80% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes overlayAnimation {
  20% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}

.info-layout {
  height: 38vh;
  max-height: none;
  display: flex;
  position: relative;
  width: 100%;
  padding: 0 var(--content-spacing) var(--content-spacing);
  flex-flow: column;
  justify-content: flex-end;

  .artist-name {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    user-select: none;
    font-size: 6em;
    font-weight: 900;
    white-space: nowrap;
    -webkit-box-orient: vertical;
    line-height: normal;
    overflow: hidden;
    text-align: left;
    width: 100%;
    word-break: break-word;
  }

  .artist-listeners-quantity {
    font-size: 1rem;
    line-height: 2;
    margin-top: 4px;
  }
}
</style>
