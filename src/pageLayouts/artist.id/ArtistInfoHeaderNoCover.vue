<script setup lang="ts">
import NoArtistAvatar from "@/UI/Icons/Shared/NoArtistAvatar.vue";
import type {HeaderProps} from "@/pageLayouts/artist.id/props/HeaderProps";
import LazyImage from "@/UI/Elements/LazyImage.vue";

defineProps<HeaderProps>()
</script>

<template>
  <div class="info-content">
    <div class="info">
      <div class="info-image">
        <LazyImage v-if="image" class="img" :image="image" />
        <NoArtistAvatar v-else class="img" draggable="false" />
      </div>
      <div class="text-info">
        <h1 class="artist-name">Name</h1>
        <span class="artist-listeners-quantity">{{4}} слушателя за месяц</span>
      </div>
    </div>

    <div class="bg" />
    <div class="bg-subbed" />
  </div>
</template>

<style scoped lang="scss">
.info-content {
  height: min(30vh, var(--fluid-height));
  max-height: 300px;
  min-height: var(--min-fluid-height);
  padding-bottom: var(--content-spacing);
  container: playlistInfo / inline-size;

  .info {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    padding: 0 var(--content-spacing);

    .info-image {
      --size: clamp(128px, 128px + (100vw - var(--sidebar-width) * 1px - var(--panel-width) * 1px - 600px) / 424 * 104, 232px);
      margin-right: var(--content-spacing);
      width: var(--size);
      height: var(--size);
      z-index: 1 !important;

      .img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
        border-radius: 50%;
        box-shadow: 0 4px 60px rgba(0,0,0,.02);
        user-select: none;
      }
    }

    .text-info {
      display: flex;
      flex: 1;
      flex-flow: column;
      justify-content: flex-end;
      z-index: 1 !important;

      .artist-name {
        font-size: 6rem;
        font-family: var(--title-font);
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
        line-height: normal;
        overflow: hidden;
        text-align: left;
        width: 100%;
        word-break: break-word;
        user-select: none;
      }

      .artist-listeners-quantity {
        font-size: 1rem;
        line-height: 2;
        margin-top: 4px;
      }
    }
  }

  .bg {
    display: block;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    background-color: v-bind(mask);
  }

  .bg-subbed {
    display: block;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    background: linear-gradient(transparent 0, rgba(0,0,0,.5) 100%),var(--background-noise);
  }
}
</style>