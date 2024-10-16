<script setup lang="ts">
function getGreeting() {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return 'Доброе утро';
  } else if (currentHour >= 12 && currentHour < 17) {
    return 'Добрый день';
  } else if (currentHour >= 17 && currentHour < 21) {
    return 'Добрый вечер';
  } else {
    return 'Доброй ночи';
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