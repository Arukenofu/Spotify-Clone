<script setup lang="ts">
import MusicCard from "@/shared/UI/Elements/MusicCard.vue";
import type {Image, ItemTypes, PartialSearchResult} from "@spotify/web-api-ts-sdk";
import getImageFromEntity from "@/shared/utils/getImageFromEntity";
import {addToHistory} from "@/features/SearchHistory";
import SearchCardDescriptionRenderer from "@/pageLayouts/search/SearchCardDescriptionRenderer.vue";
import {proxy} from "@/shared/utils/proxy";

type SearchResultKeys = `${Exclude<ItemTypes, 'track'>}s`

const props = defineProps<{
  item: NonNullable<PartialSearchResult[SearchResultKeys]>['items'][number];
  type: SearchResultKeys
}>();

function loadImage(images: Image[], index: number = 0) {
  const image = getImageFromEntity(images, index);

  return props.type === 'playlists' ? proxy(image || '') : image;
}
</script>

<template>
  <MusicCard
    :id="item.id"
    :type="item.type as ItemTypes"
    :name="item.name"
    :image="loadImage(item.images)"
    :mask-loader-image="loadImage(item.images, 2)"
    @click="addToHistory(item)"
  >
    <SearchCardDescriptionRenderer :entity="item" />
  </MusicCard>
</template>

<style scoped lang="scss">

</style>