<script setup lang="ts">
import type {HeaderProps} from "@/pageLayouts/artist.id/props/HeaderProps";
import EntityInfoHeader from "@/UI/Elements/EntityInfoHeader.vue";
import getDeclention from "@/shared/utils/getDeclention";

defineProps<HeaderProps>()
</script>

<template>
  <EntityInfoHeader
    class="info-header"
    :image="image ?? null"
    :mask="mask"
    type="Artist"
  >
    <h1 class="artist-name">{{name}}</h1>
    <span class="artist-listeners-quantity">
      {{getDeclention(listenersPerMonth, 'слушатель', 'слушателя', 'слушателей', 'readable')}} в месяц
    </span>
  </EntityInfoHeader>
</template>

<style scoped lang="scss">
.info-header {
  margin-top: -64px;

  .artist-name {
    font-size: 6rem;
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
</style>