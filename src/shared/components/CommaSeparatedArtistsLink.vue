<script setup lang="ts">
import type {SimpleArtist} from "@/services/types/Artist";

defineProps<{
  artists: SimpleArtist[],
}>()

</script>

<template>
  <RouterLink v-for="(artist, index) in artists" :key="artist.id" :to="`/artist/${artist.id}`" v-bind="$attrs">
    {{artist.name}}<template v-if="index !== artists?.length - 1">, </template>
  </RouterLink>
</template>

<style lang="scss">

</style>