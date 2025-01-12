<script setup lang="ts">
import MusicCard from "@/shared/UI/Elements/MusicCard.vue";
import type {ItemTypes, PartialSearchResult} from "@spotify/web-api-ts-sdk";
import getImageFromEntity from "@/shared/utils/getImageFromEntity";
import {addToHistory} from "@/features/SearchHistory";
import SearchCardDescriptionRenderer from "@/pageLayouts/search/SearchCardDescriptionRenderer.vue";

type SearchResultKeys = `${Exclude<ItemTypes, 'track'>}s`

defineProps<{
  type: SearchResultKeys;
  item: PartialSearchResult;
}>();
</script>

<template>
  <template
    v-for="(entity, index) in item[type]?.items"
    :key="index"
  >
    <MusicCard
      v-if="entity"
      :id="entity.id"
      :type="entity.type as ItemTypes"
      :name="entity.name"
      :image="getImageFromEntity(entity.images)"
      :mask-loader-image="getImageFromEntity(entity.images, 2)"
      @click="addToHistory(entity)"
    >
      <SearchCardDescriptionRenderer :entity="entity" />
    </MusicCard>
  </template>
</template>

<style scoped lang="scss">

</style>