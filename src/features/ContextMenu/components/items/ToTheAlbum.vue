<script setup lang="ts">
import {BasicContextMenuItem} from "@/features/ContextMenu";
import AlbumIcon from "@/UI/Icons/Shared/AlbumIcon.vue";
import {RouterLink} from "vue-router";
</script>

<template>
  <BasicContextMenuItem :as="RouterLink" v-bind="$props">
    <template #icon>
      <AlbumIcon />
    </template>
    К альбому
  </BasicContextMenuItem>
</template>

<style scoped lang="scss">

</style>