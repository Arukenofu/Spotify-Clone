<script setup lang="ts">
import setTitle from "@/shared/utils/setTitle";

setTitle('Страница не найдена');
</script>

<template>
    <div class="layout">
      <div class="center">
        <div class="logo"><img src="https://open.spotifycdn.com/cdn/images/error-page-logo.24aca703.svg" alt="logo"></div>
        <h1>Страница не найдена</h1>
        <p>Мы не нашли нужную страницу</p>

        <RouterLink to="/">
          Главная
        </RouterLink>
      </div>
    </div>
</template>

<style lang="scss" scoped>
.layout {
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

<route lang="yaml">
meta:
  layout: false
</route>