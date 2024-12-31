<script setup lang="ts">
import {BasicContextMenuItem} from "@/features/ContextMenu";
import AlbumIcon from "@/UI/Icons/Shared/AlbumIcon.vue";
import {RouterLink} from "vue-router";
import ctxT from "../../helpers/ctx-t";
</script>

<template>
  <BasicContextMenuItem :as="RouterLink" v-bind="$props">
    <template #icon>
      <AlbumIcon />
    </template>
    {{ctxT('toTheAlbum')}}
  </BasicContextMenuItem>
</template>

<style scoped lang="scss">

</style>