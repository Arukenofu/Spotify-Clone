<script setup lang="ts">
import setTitle from '@/shared/utils/setTitle';
import {useI18n} from "vue-i18n";

definePage({
  meta: {
    layout: false
  },
});

const {t} = useI18n();

setTitle(t('route-titles.404'));
</script>

<template>
  <div class="recommended-cards">
    <div class="center">
      <div class="logo">
        <img
          src="https://open.spotifycdn.com/cdn/images/error-page-logo.24aca703.svg"
          alt="logo"
        >
      </div>
      <h1>{{t('404.title')}}</h1>
      <p>{{t('404.description')}}</p>

      <RouterLink to="/">
        {{t('404.home')}}
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.recommended-cards {
  width: 100dvw;
  height: 100dvh;
  cursor: pointer;

  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 90%;

    .logo {
      margin-bottom: 40px;
    }

    h1 {
      font-size: 3rem;
      font-weight: 900;
      margin-bottom: 16px;
      text-align: center;
    }

    p {
      text-align: center;
      margin-bottom: 40px;
      color: var(--text-soft);
      font-weight: 300;
    }

    a {
      display: block;
      background-color: var(--white);
      border: 1px solid #878787;
      border-radius: 500px;
      color: var(--black);
      padding: 12px 32px;
      font-weight: 700;
      line-height: 24px;

      &:hover {
        border-color: var(--black);
        scale: 1.04;
      }
    }
  }
}
</style>