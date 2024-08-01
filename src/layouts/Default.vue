<script setup lang="ts">
import MediaPlayer from "@/modules/MediaPlayer";
import {LayoutSideBar} from "@/modules/LayoutSideBar";

</script>

<template>
  <div class="root">
    <div class="main">

      <LayoutSideBar />

      <main>
        <Suspense>
          <RouterView />
        </Suspense>
      </main>

      <aside v-if="true" class="info">

      </aside>
    </div>
  </div>

  <MediaPlayer />
</template>

<style lang="scss" scoped>
.root {
  width: 100dvw;
  height: calc(100dvh - var(--player-height));
  display: grid;
  padding: 7px;

  .main {
    border-radius: var(--layout-gap);
    display: flex;

    aside {
      border-radius: var(--border-radius);
    }

    .info {
      background-color: var(--ui);
      max-height: 100%;
      width: 350px;
    }

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