<script setup lang="ts">

</script>

<template>
  <section class="no-updates">
    <h1 class="updates-title">Нет обновлений</h1>
    <p class="updates-body">Все новости будут появляться здесь. Подпишись на подкасты и любимых исполнителей, чтобы быть в курсе самого интересного.</p>
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