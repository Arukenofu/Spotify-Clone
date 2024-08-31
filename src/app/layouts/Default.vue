<script setup lang="ts">
import {MediaPlayer} from "@/widgets/MediaPlayer";
import {LayoutSideBar} from "@/widgets/LayoutSideBar";
import {LayoutInfoContent} from "@/widgets/LayoutInfoPanel";
import {LayoutHeader} from "@/widgets/LayoutHeader";
import ScrollableBlock from "@/UI/Blocks/ScrollableBlock.vue";
import {provide, ref} from "vue";
import type {Ref} from "vue"
import {router} from "@/app/router";
import useResponsive from "@/shared/composables/useResponsive";

interface ScrollableWithExpose extends Ref<InstanceType<typeof ScrollableBlock>> {
  content: HTMLElement,
}

const layout = ref<ScrollableWithExpose>();
const layoutScrollY = ref<number>(0);

provide('layoutScrollY', layoutScrollY);

router.beforeEach(() => {
  layout.value?.content.scrollTo({
    top: 0,
  });
});

const {isMobile} = useResponsive();
</script>

<template>
  <div class="root">
    <LayoutHeader />

    <div class="main">

      <LayoutSideBar v-if="!isMobile" />

      <ScrollableBlock
          is="main"
          gap="0"
          ref="layout"
          v-model="layoutScrollY"
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

  <MediaPlayer />
</template>

<style lang="scss" scoped>
.root {
  width: 100dvw;
  display: grid;
  padding: 7px;
  gap: var(--layout-gap);
  background-color: var(--black);

  .main {
    border-radius: var(--layout-gap);
    height: calc(100dvh - 72px - var(--player-height));
    min-height: 400px;
    display: flex;

    main {
      position: relative;
      background-color: var(--ui);
      flex: 1;
      border-radius: var(--border-radius);
      container-type: inline-size;
      container-name: content;
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