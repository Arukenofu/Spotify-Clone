<script setup lang="ts">
import SpotifyLogo from '@/UI/Icons/Shared/SpotifyLogo.vue';
import RoundButton from '@/UI/Buttons/RoundButton.vue';
import HomeIcon from '@/UI/Icons/Shared/HomeIcon.vue';
import Search from '@/widgets/LayoutHeader/components/Search.vue';
import DownloadIcon from '@/widgets/LayoutHeader/UI/DownloadIcon.vue';
import BellIcon from '@/widgets/LayoutHeader/UI/BellIcon.vue';
import User from '@/widgets/LayoutHeader/components/User.vue';
import useCurrentRoutePath from '@/shared/composables/useCurrentRoutePath';

const { currentRoutePath } = useCurrentRoutePath('path');
</script>

<template>
  <header>
    <div class="logo">
      <SpotifyLogo class="icon" />
    </div>

    <div class="left-side">
      <RoundButton
        class="homeButton"
        @click="$router.push('/')"
        v-tooltip.center_bottom="'Главная'"
      >
        <HomeIcon class="icon" :state="currentRoutePath === '/'" />
      </RoundButton>

      <Search />
    </div>

    <div class="right-side">
      <button
        class="premium-button"
        @click="$router.push('/premium')"
        v-if="currentRoutePath !== '/search'"
      >
        Узнать больше о Premium
      </button>

      <button class="desktop-app-button" @click="$router.push('/download')">
        <DownloadIcon class="icon" />
        <span> Установить приложение </span>
      </button>

      <div
        class="notification"
        @click="$router.push('/content-feed')"
        v-tooltip.center_bottom="'Что нового'"
      >
        <BellIcon
          :state="currentRoutePath === '/content-feed'"
          :class="currentRoutePath === '/content-feed' && 'active'"
          class="icon"
        />
      </div>

      <User />
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  height: 48px;
  display: flex;
  align-items: center;
  position: relative;

  .logo {
    height: 72px;
    width: 72px;
    min-width: 72px;
    display: grid;
    place-items: center;

    .icon {
      fill: var(--white);
    }
  }

  .left-side {
    display: flex;
    flex: 1;
    height: 100%;

    .homeButton {
      margin-left: 8px;
      height: 48px;
      width: 48px;
      min-width: 48px;
      background-color: var(--ui-highlight);

      &:active {
        background-color: var(--ui-highlight) !important;
        opacity: 0.75;
        scale: 0.96 !important;
      }

      &:hover {
        scale: 1.02;
      }

      .icon {
        width: 24px;
        height: 24px;
        fill: var(--white);
      }
    }
  }

  .right-side {
    display: flex;
    align-items: center;
    gap: 8px;

    .premium-button {
      height: 32px;
      flex-shrink: 0;
      font-weight: 800;
      font-size: 0.875rem;
      background-color: var(--white);
      color: var(--black);
      padding: 4px 16px;
      border: none;
      transition-property: opacity, scale;
      transition-duration: 33ms;
      border-radius: 500px;
      cursor: pointer;

      @media screen and (max-width: 1050px) {
        & {
          display: none;
        }
      }

      &:hover {
        scale: 1.04;
      }

      &:active {
        opacity: 0.8;
        scale: 1;
      }
    }

    .desktop-app-button {
      display: flex;
      align-items: center;
      gap: 6px;
      height: 32px;
      flex-shrink: 0;
      font-size: 0.875rem;
      background-color: var(--black);
      color: var(--white);
      border: none;
      padding: 4px 16px;
      cursor: pointer;
      transition-property: opacity, scale;
      transition-duration: 33ms;

      &:hover {
        scale: 1.04;

        span {
          text-decoration: underline;
        }
      }

      &:active {
        opacity: 0.8;
        scale: 1;
      }

      span {
        font-weight: 800;
      }

      .icon {
        fill: var(--white);
        width: 16px;
        height: 16px;
      }
    }

    .notification {
      width: 32px;
      height: 32px;
      display: grid;
      place-items: center;
      cursor: pointer;
      margin: 0 8px;

      @media screen and (max-width: 815px) {
        & {
          display: none;
        }
      }

      .icon {
        width: 16px;
        height: 16px;
        fill: var(--text-soft);
      }

      &:hover .icon,
      .active {
        fill: var(--white);
      }
    }
  }
}
</style>
