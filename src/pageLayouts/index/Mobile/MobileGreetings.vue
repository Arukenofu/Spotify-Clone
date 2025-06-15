<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

function getGreeting() {
  const currentHour = new Date().getHours()

  if (currentHour >= 5 && currentHour < 12) {
    return t('index.page.greetings.morning')
  }
  else if (currentHour >= 12 && currentHour < 17) {
    return t('index.page.greetings.day')
  }
  else if (currentHour >= 17 && currentHour < 21) {
    return t('index.page.greetings.evening')
  }
  else {
    return t('index.page.greetings.night')
  }
}
</script>

<template>
  <section class="greetings">
    <h1>{{ getGreeting() }}</h1>
  </section>
</template>

<style scoped lang="scss">
.greetings {
  margin-top: 28px;
  padding: 0 var(--content-spacing);
  margin-bottom: 42px;

  h1 {
    font-size: 1.25rem;
    font-weight: 800;
    margin-top: 12px;
    margin-bottom: 8px;
  }
}
</style>
