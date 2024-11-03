<script setup lang="ts">
import type {SimpleArtist} from "@/services/types/Entities/Artist";

defineProps<{
  artists: SimpleArtist[],
}>()

</script>

<template>
  <RouterLink v-for="(artist, index) in artists" :key="artist.id" :to="`/artist/${artist.id}`" class="v-link" v-bind="$attrs">
    {{artist.name}}<template v-if="index !== artists?.length - 1">, </template>
  </RouterLink>
</template>

<style lang="scss">
.v-link {

  &:hover {
    text-decoration: underline;
  }

  &:not(:last-child)::after {
    content: ",\00a0";
  }
}
</style>