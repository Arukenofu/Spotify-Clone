<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Tippy } from 'vue-tippy'
import useCurrentRoutePath from '@/shared/composables/useCurrentRoutePath'
import LongRoundButton from '@/shared/UI/Buttons/LongRoundButton.vue'
import RoundButton from '@/shared/UI/Buttons/RoundButton.vue'
import HomeIcon from '@/shared/UI/Icons/HomeIcon.vue'
import SpotifyLogo from '@/shared/UI/Icons/SpotifyLogo.vue'
import Search from '@/widgets/LayoutHeader/components/Search.vue'
import User from '@/widgets/LayoutHeader/components/User.vue'
import BellIcon from '@/widgets/LayoutHeader/UI/BellIcon.vue'
import DownloadIcon from '@/widgets/LayoutHeader/UI/DownloadIcon.vue'

const { currentRoutePath } = useCurrentRoutePath('path')

const { t } = useI18n()
</script>

<template>
  <header>
    <div class="logo">
      <SpotifyLogo class="icon" />
    </div>

    <div class="left-side">
      <Tippy :content="t('app-header.tooltip.home')">
        <RoundButton
          class="homeButton"
          @click="$router.push('/')"
        >
          <HomeIcon
            class="icon"
            :state="currentRoutePath === '/'"
          />
        </RoundButton>
      </Tippy>

      <Search />
    </div>

    <div class="right-side">
      <LongRoundButton
        v-if="currentRoutePath !== '/search'"
        class="premium-button"
        @click="$router.push('/premium')"
      >
        {{ t('app-header.premium') }}
      </LongRoundButton>

      <LongRoundButton
        class="desktop-app-button"
        @click="$router.push('/download')"
      >
        <DownloadIcon class="icon" />
        <span> {{ t('app-header.download') }} </span>
      </LongRoundButton>

      <Tippy
        :content="t('app-header.tooltip.contentFeed')"
        class="notification"
        @click="$router.push('/content-feed')"
      >
        <BellIcon
          :state="currentRoutePath === '/content-feed'"
          :class="currentRoutePath === '/content-feed' && 'active'"
          class="icon"
        />
      </Tippy>

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
  margin-bottom: var(--layout-gap);

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
    margin-left: 8px;

    .homeButton {
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
      background-color: var(--white);
      color: var(--black);

      @media screen and (max-width: 1050px) {
        & {
          display: none;
        }
      }
    }

    .desktop-app-button {
      background-color: transparent;
      color: var(--white);
      display: flex;
      align-items: center;
      gap: 6px;

      &:hover {
        span {
          text-decoration: underline;
        }
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
