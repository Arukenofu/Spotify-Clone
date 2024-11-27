<script setup lang="ts">
import {BasicContextMenuItem, WithSubtree} from "@/features/ContextMenu";
import ArtistIcon from "@/UI/Icons/Shared/ArtistIcon.vue";
import {RouterLink} from "vue-router";
import type {SimpleArtist} from "@/services/types/Entities/Artist";
import TriangleIcon from "@/UI/Icons/Shared/TriangleIcon.vue";

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
    К исполнителю
  </BasicContextMenuItem>

  <WithSubtree>
    <BasicContextMenuItem>
      <template #icon>
        <ArtistIcon />
      </template>
      К исполнителю
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