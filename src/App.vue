<script setup lang="ts">
import MediaPlayer from "@/components/MediaPlayer.vue";
</script>

<template>

  <div class="root">
    <div class="main">
      <aside>

      </aside>

      <main>
        <Suspense>
          <RouterView />
        </Suspense>
      </main>
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
    border-radius: var(--border-radius);
    display: flex;
    gap: var(--border-radius);

    aside {
      background-color: var(--ui);
      max-height: 100%;
      width: 380px;
      border-radius: var(--border-radius);
    }

    main {
      flex: 1;
      background-color: var(--ui);
      border-radius: var(--border-radius);
    }

  }
}

</style>
