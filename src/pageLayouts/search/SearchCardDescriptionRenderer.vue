<script setup lang="ts">
import type {PartialSearchResult, SimplifiedAlbum} from "@spotify/web-api-ts-sdk";
import CommaSeparatedArtistsLink from "@/shared/components/Sugar/CommaSeparatedArtistsLink.vue";
import CommaSeparatedEntityLink from "@/shared/components/CommaSeparatedEntityLink.vue";

defineProps<{
  entity: NonNullable<PartialSearchResult[keyof PartialSearchResult]>['items'][number]
}>();
</script>

<template>
  <template v-if="'owner' in entity">
    <CommaSeparatedEntityLink
      entity="user"
      :entities="[{
        id: entity.id,
        name: entity.name
      }]"
      @click.stop
    />
  </template>
  <template v-else-if="'release_date' in entity">
    {{entity.release_date.split('-')[0]}} •
    <CommaSeparatedArtistsLink
      :artists="(entity as SimplifiedAlbum).artists.map((value) => ({
        id: value.id,
        name: value.name
      }))"
      @click.stop
    />
  </template>
</template>

<style scoped lang="scss">

</style>