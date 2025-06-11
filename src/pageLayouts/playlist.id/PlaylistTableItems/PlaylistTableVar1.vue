<script setup lang="ts">
import CommaSeparatedArtistsLink from "@/shared/components/Sugar/CommaSeparatedArtistsLink.vue";
import type {FormatTypes} from "#imports";
import type {SimplifiedArtist} from "@spotify/web-api-ts-sdk";

defineProps<{
  trackId: string;
  albumName: string;
  format: FormatTypes;
  artists: SimplifiedArtist[];
}>();
</script>

<template>
  <CommaSeparatedArtistsLink
    v-if="format === 'Compact'"
    :artists="artists"
    class="artists"
  />
  <RouterLink
    v-else
    :to="`/album/${trackId}`"
    class="link"
  >
    {{albumName}}
  </RouterLink>
</template>

<style lang="scss">

</style>