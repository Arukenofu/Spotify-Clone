<script setup lang="ts">
import {BasicContextMenuItem, WithSubtree} from "@/features/ContextMenu";
import ArtistIcon from "@/shared/UI/Icons/ArtistIcon.vue";
import {RouterLink} from "vue-router";
import type {SimpleArtist} from "@/services/types/Entities/Artist";
import TriangleIcon from "@/shared/UI/Icons/TriangleIcon.vue";
import ctxT from "../../helpers/ctx-t";

defineProps<{
  artists: SimpleArtist[]
}>();
</script>

<template>
  <BasicContextMenuItem
    v-if="artists.length === 1"
    :as="RouterLink"
    :to="`/artist/${artists[0].id}`"
    v-bind="$props"
  >
    <template #icon>
      <ArtistIcon />
    </template>
    {{ctxT('toTheArtist')}}
  </BasicContextMenuItem>

  <WithSubtree>
    <BasicContextMenuItem>
      <template #icon>
        <ArtistIcon />
      </template>
      {{ctxT('toTheArtist')}}
      <template #additionalIcon>
        <TriangleIcon />
      </template>
    </BasicContextMenuItem>

    <template #context>
      <BasicContextMenuItem
        v-for="artist in artists"
        :key="artist.id"
        :as="RouterLink"
        :to="`/artist/${artist.id}`"
        class="subtree-item"
      >
        {{artist.name}}
      </BasicContextMenuItem>
    </template>
  </WithSubtree>
</template>

<style scoped lang="scss">
.subtree-item {
  width: 162px;
}
</style>