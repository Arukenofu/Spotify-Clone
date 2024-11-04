<script setup lang="ts">
import Logo from "@/UI/Icons/Shared/Logo.vue";
</script>

<template>
  <div class="wrapper">
    <Logo class="logo" />

    <h1>Браузер не поддерживается</h1>
    <p>Spotify не работает в этом браузере. Для более ярких впечатлений от прослушивания музыки обнови браузер или скачай приложение Spotify.</p>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 32px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .logo {
    fill: var(--main-color);
    width: 56px;
    height: 56px;
  }

  h1 {
    font-size: 48px;
    font-weight: 700;
    letter-spacing: -.02em;
    line-height: 1;
    margin: 40px 0 16px;
    font-family: var(--main-font);
    text-align: center;
  }

  p {
    color: #a7a7a7;
    font-weight: 200;
    line-height: 25px;
    margin: 0 0 40px;
    max-width: 507px;
    font-family: sans-serif;
    text-align: center;
  }
}

@media (height <= 550px) {
  .wrapper {
    padding: 16px !important;

    .logo {
      width: 24px;
      height: 24px;
    }

    h1 {
      font-size: 18px;
      line-height: 25px;
      margin: 0 0 8px;
    }

    p {
      font-size: 13px;
      line-height: 20px;
      margin: 0 0 16px;
      max-width: 255px;
    }
  }
}

@media (height <= 450px) {
  .wrapper {

    h1 {
      font-size: 40px;
    }
    p {
      max-width: inherit;
    }
  }
}
</style>