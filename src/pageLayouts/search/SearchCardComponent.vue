<script setup lang="ts">
import MusicCard from "@/shared/UI/Elements/MusicCard.vue";
import type {ItemTypes, PartialSearchResult, SimplifiedAlbum, SimplifiedTrack,} from "@spotify/web-api-ts-sdk";
import CommaSeparatedArtistsLink from "@/shared/components/Sugar/CommaSeparatedArtistsLink.vue";
import CommaSeparatedEntityLink from "@/shared/components/CommaSeparatedEntityLink.vue";
import getImageFromEntity from "@/shared/utils/getImageFromEntity";

type SearchResultKeys = `${ItemTypes}s`

defineProps<{
  type: SearchResultKeys;
  item: PartialSearchResult;
}>();
</script>

<template>
  <template
    v-for="(data, index) in item[type]?.items"
    :key="index"
  >
    <MusicCard
      v-if="data"
      :id="data.id"
      :type="data.type as ItemTypes"
      :name="data.name"
      :image="getImageFromEntity(data) ?? null"
      :mask-loader-image="getImageFromEntity(data, 2) ?? null"
      :color="''"
    >
      <template v-if="data.type === 'playlist'">
        <CommaSeparatedEntityLink
          entity="user"
          :entities="[{
            id: (data as SimplifiedPlaylist).owner.id,
            name: (data as SimplifiedPlaylist).owner.display_name
          }]"
          @click.stop
        />
      </template>
      <template v-else-if="data.type === 'album'">
        {{(data as SimplifiedAlbum).release_date.split('-')[0]}} •
        <CommaSeparatedArtistsLink
          :artists="(data as SimplifiedAlbum).artists.map((value) => ({
            id: value.id,
            name: value.name,
          }))"
          @click.stop
        />
      </template>
      <template v-else-if="data.type === 'track'">
        <CommaSeparatedArtistsLink
          :artists="(data as SimplifiedTrack).artists.map((value) => ({
            id: value.id,
            name: value.name,
          }))"
          @click.stop
        />
      </template>
    </MusicCard>
  </template>
</template>

<style scoped lang="scss">

</style>