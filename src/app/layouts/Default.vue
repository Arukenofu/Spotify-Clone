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
        <div class="background-noise" />

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
      position: relative;
      background-color: var(--ui);
      flex: 1;
      border-radius: var(--border-radius);

      .background-noise {
        --background-noise: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=");
        background-color: rgb(83, 83, 83);
        background-image: linear-gradient(rgba(0,0,0,.6) 0, var(--ui) 100%), var(--background-noise);

        transition-duration: 1s;
        transition-property: background;
        transition-timing-function: ease;

        height: 350px;
        width: 100%;

        position: absolute;
      }
    }

  }
}
</style>

<route lang="yaml">
meta:
  layout: Default
</route>