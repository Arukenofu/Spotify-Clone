<script setup lang="ts">
import setTitle from '@/shared/utils/setTitle';
import NoUpdates from "@/pageLayouts/content-feed/NoUpdates.vue";

setTitle('Spotify — Web Player');
</script>

<template>
  <div class="recommended-cards">
    <div class="heading">
      <h1 class="heading-title">Что нового</h1>
      <p class="heading-body">Последние релизы любимых исполнителей из твоих подписок</p>
    </div>

    <NoUpdates />
  </div>
</template>

<style lang="scss" scoped>
.recommended-cards {
  margin: 24px;
  max-width: 800px;
  margin-inline: auto;
  padding: 0 var(--content-spacing);

  .heading {
    margin-top: 64px;

    .heading-title {
      font-weight: 700;
      line-height: 1.375;
      padding-bottom: 4px;
      text-wrap: balance;
    }

    .heading-body {
      font-size: .875rem;
      font-weight: 500;
      color: var(--text-soft);
      text-wrap: balance;
    }
  }
}
</style>
