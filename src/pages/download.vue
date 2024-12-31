<script setup lang="ts">
import {computed, inject, ref} from 'vue';
import {BackgroundNoise, useBackgroundNoise} from '@/features/BackgroundNoise';
import DesktopImage from '@/assets/images/desktop-app.png';
import StickyHeader from '@/UI/Blocks/StickyHeader.vue';
import setTitle from '@/shared/utils/setTitle';
import {useI18n} from "vue-i18n";

const {t} = useI18n();

setTitle(t('route-titles.downloadDesktop'));

const { currentColor } = useBackgroundNoise('#447bff');

const layoutScrollY = inject('layoutScrollY', ref(0));

const computeOpacity = computed<number>(() => {
  if (layoutScrollY.value === 0) {
    return 0;
  }

  return Math.min(layoutScrollY.value / 8, 1);
});
</script>

<template>
  <StickyHeader
    class="header"
    :style="`opacity: ${computeOpacity}`"
  />
  <BackgroundNoise
    :current-color="currentColor"
    height="260px"
  />

  <section>
    <img
      :src="DesktopImage"
      alt="Desktop image"
    >
    <h1>Установи приложение Spotify и слушай любимую музыку на компьютере.</h1>

    <button>Скачай Spotify бесплатно</button>
  </section>
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  background-color: var(--ui);
  transition: opacity 0.25s ease-out;
  top: 64px;
}

section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 55px;
  padding-bottom: 32px;

  img {
    height: 396px;
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
    width: 640px;
  }

  h1 {
    max-width: 100%;
    width: 640px;
    text-align: center;
    font-weight: 900;
    font-size: 2rem;
    text-wrap: balance;
    line-height: 1.4;
    padding-bottom: 24px;
  }

  button {
    display: block;
    background-color: var(--main-color);
    border: none;
    padding: 8px 32px;
    border-radius: 500px;
    height: 48px;
    min-height: 48px;
    color: var(--black);
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
      scale: 1.04;
      filter: brightness(1.2);
    }

    &:active {
      filter: brightness(0.9);
      scale: 1 !important;
    }
  }
}
</style>
