<script setup lang="ts">
import BackgroundNoiseStickyHeader from '@/pageLayouts/index/BackgroundNoiseStickyHeader.vue'
import MobileGreetings from '@/pageLayouts/index/Mobile/MobileGreetings.vue'
import Recommendations from '@/pageLayouts/index/Recommendations.vue'
import useResponsive from '@/shared/composables/useResponsive'
import setTitle from '@/shared/utils/setTitle'

const { isMobile } = useResponsive()

setTitle('Spotify - Web Player: Music for everyone')
</script>

<template>
  <MobileGreetings v-if="isMobile" />

  <BackgroundNoiseStickyHeader
    v-else
    mask-color="var(--ui)"
  />

  <section class="container">
    <Recommendations />
  </section>
</template>

<style lang="scss" scoped>
.container {
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: 0 var(--content-spacing);
  display: grid;
  gap: 24px 32px;
  padding-bottom: 32px;

  :deep(.head-area) {
    height: 48px;
  }
}
</style>
