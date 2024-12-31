<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {t} = useI18n();
</script>

<template>
  <section class="no-updates">
    <h1 class="updates-title">{{t('content-feed.noUpdatesTitle')}}</h1>
    <p class="updates-body">{{t('content-feed.noUpdatesDescription')}}</p>
  </section>
</template>

<style scoped lang="scss">
.no-updates {
  margin-top: 16px;
  height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;

  .updates-title {
    margin-bottom: 8px;
    margin-top: 20px;
    font-weight: 700;
    font-size: 2rem;
    text-wrap: balance;
  }

  .updates-body {
    margin-bottom: 32px;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.375;
  }
}
</style>