<script setup lang="ts">
import { provide, ref, watchEffect } from 'vue';
import { LayoutMobileRouter } from '@/widgets/LayoutRouterMobile';
import { MediaPlayer } from '@/widgets/MediaPlayer';
import { LayoutSideBar } from '@/widgets/LayoutSideBar';
import { LayoutInfoContent } from '@/widgets/LayoutInfoPanel';
import { LayoutHeader } from '@/widgets/LayoutHeader';
import { router } from '@/app/router';
import useResponsive from '@/shared/composables/useResponsive';
import ScrollableBlock from '@/UI/Blocks/ScrollableBlock.vue';
import SpotifyView from "@/app/components/SpotifyView.vue";
import type { Ref } from 'vue';
import PageFooter from "@/app/components/PageFooter.vue";

interface ScrollableWithExpose
  extends Ref<InstanceType<typeof ScrollableBlock>> {
  content: HTMLElement;
}

const layout = ref<ScrollableWithExpose>();
const layoutScrollY = ref<number>(0);

provide('layoutScrollY', layoutScrollY);
provide('layoutContent', layout)

router.afterEach(() => {
  layout.value?.content.scrollTo({
    top: 0
  });
  layoutScrollY.value = 0;
});

const { isMobile } = useResponsive();

watchEffect(() => {
  function setStyleVar(property: string, value: string) {
    document.documentElement.style.setProperty(property, value);
  }

  if (isMobile.value) {
    setStyleVar('--content-height', 'calc(100dvh - var(--mobile-router-height))');
    setStyleVar('--layout-gap', '0px');
  } else {
    setStyleVar('--content-height', 'calc(100dvh - var(--player-height) - 72px)');
    setStyleVar('--layout-gap', '8px');
  }
});
</script>

<template>
  <div class="root">
    <template v-if="!isMobile">
      <LayoutHeader />

      <div class="main">
        <LayoutSideBar />

        <ScrollableBlock
          is="main"
          ref="layout"
          v-model="layoutScrollY"
          gap="0"
          scrollbar-width="12px"
          :allow-style-shadow="false"
        >
          <SpotifyView />

          <PageFooter />
        </ScrollableBlock>

        <LayoutInfoContent />
      </div>
    </template>

    <template v-else>
      <div class="main">
        <ScrollableBlock
          is="main"
          ref="layout"
          v-model="layoutScrollY"
          gap="0"
          scrollbar-width="5px"
          :allow-style-shadow="false"
        >
          <SpotifyView />
        </ScrollableBlock>
      </div>
    </template>
  </div>

  <LayoutMobileRouter v-if="isMobile" />
  <MediaPlayer v-else />
</template>

<style lang="scss" scoped>
.root {
  width: 100dvw;
  display: grid;
  padding: var(--layout-gap);
  background-color: var(--black);

  .main {
    height: var(--content-height);
    min-height: 400px;
    display: flex;

    main {
      position: relative;
      background-color: var(--ui);
      flex: 1;
      border-radius: var(--border-radius);
      container-type: inline-size;
      container-name: content;

      @media screen and (max-width: 768px) {
        & {
          border-radius: 0 !important;
        }
      }
    }

    .content {
      position: relative;
      min-height: 100%;
      z-index: 1 !important;
    }
  }
}
</style>

<route lang="yaml">
meta:
  layout: Default
</route>
