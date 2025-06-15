<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import NoUpdates from '@/pageLayouts/content-feed/NoUpdates.vue'
import setTitle from '@/shared/utils/setTitle'

setTitle('Spotify — Web Player')

const { t } = useI18n()
</script>

<template>
  <div class="recommended-cards">
    <div class="heading">
      <h1 class="heading-title">
        {{ t('content-feed.headingTitle') }}
      </h1>
      <p class="heading-body">
        {{ t('content-feed.headingText') }}
      </p>
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
