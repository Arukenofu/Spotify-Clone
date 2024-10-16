<script setup lang="ts">
import { useBackgroundNoise } from '@/features/BackgroundNoise';
import useResponsive from '@/shared/composables/useResponsive';
import setTitle from '@/shared/utils/setTitle';
import MobileGreetings from '@/pageLayouts/index/Mobile/MobileGreetings.vue';
import BackgroundNoiseStickyHeader from '@/pageLayouts/index/BackgroundNoiseStickyHeader.vue';
import RecommendationMixes from '@/pageLayouts/index/RecommendationMixes.vue';
import Recommendations from '@/pageLayouts/index/Recommendations.vue';

const { currentColor, setColor } = useBackgroundNoise();
const { isMobile } = useResponsive();

setTitle('Spotify - Web Player: Music for everyone');
</script>

<template>
  <MobileGreetings v-if="isMobile" />

  <BackgroundNoiseStickyHeader
    v-else
    :current-color="currentColor"
    @set-color="setColor"
  />

  <section class="container">
    <RecommendationMixes v-if="!isMobile" @set-color="setColor" />

    <Recommendations />
  </section>
</template>

<style lang="scss" scoped>
.container {
  padding: 12px var(--content-spacing) 0;
  display: grid;
  gap: 24px 32px;
  padding-bottom: 32px;
}
</style>
