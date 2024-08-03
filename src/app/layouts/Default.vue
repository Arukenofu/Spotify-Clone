<script setup lang="ts">
import {MediaPlayer} from "@/widgets/MediaPlayer";
import {LayoutSideBar} from "@/widgets/LayoutSideBar";
import {LayoutInfoContent} from "@/widgets/LayoutInfoPanel";
import ScrollableBlock from "@/UI/Blocks/ScrollableBlock.vue";

</script>

<template>
  <div class="root">
    <div class="main">

      <LayoutSideBar />

      <ScrollableBlock is="main">
        <Suspense>
          <RouterView />
        </Suspense>
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

  .main {
    border-radius: var(--layout-gap);
    height: calc(100dvh - var(--player-height) - (var(--layout-gap) * 2));
    min-height: 500px;
    display: flex;

    main {
      flex: 1;
      background-color: var(--ui);
      border-radius: var(--border-radius);
    }

  }
}
</style>

<route lang="yaml">
meta:
  layout: Default
</route>