<script setup lang="ts">
import { LayoutMobileRouter } from '@/widgets/LayoutRouterMobile';
import { MediaPlayer } from '@/widgets/MediaPlayer';
import { LayoutSideBar } from '@/widgets/LayoutSideBar';
import { LayoutInfoContent } from '@/widgets/LayoutInfoPanel';
import { LayoutHeader } from '@/widgets/LayoutHeader';
import ScrollableBlock from '@/UI/Blocks/ScrollableBlock.vue';
import { provide, ref, watchEffect } from 'vue';
import type { Ref } from 'vue';
import { router } from '@/app/router';
import useResponsive from '@/shared/composables/useResponsive';

interface ScrollableWithExpose
  extends Ref<InstanceType<typeof ScrollableBlock>> {
  content: HTMLElement;
}

const layout = ref<ScrollableWithExpose>();
const layoutScrollY = ref<number>(0);

provide('layoutScrollY', layoutScrollY);

router.beforeEach(() => {
  layout.value?.content.scrollTo({
    top: 0
  });
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
    <LayoutHeader v-if="!isMobile" />

    <div class="main">
      <LayoutSideBar v-if="!isMobile" />

      <ScrollableBlock
        is="main"
        ref="layout"
        v-model="layoutScrollY"
        gap="0"
        :scrollbar-width="isMobile ? '5px' : '12px'"
        :allow-style-shadow="false"
      >
        <div class="content">
          <Suspense>
            <RouterView />
          </Suspense>
        </div>
      </ScrollableBlock>

      <LayoutInfoContent />
    </div>
  </div>

  <LayoutMobileRouter v-if="isMobile" />
  <MediaPlayer v-if="!isMobile" />
</template>

<style lang="scss" scoped>
.root {
  width: 100dvw;
  display: grid;
  padding: var(--layout-gap);
  gap: var(--layout-gap);
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
      z-index: 1 !important;
    }
  }
}
</style>

<route lang="yaml">
meta:
  layout: Default
</route>
