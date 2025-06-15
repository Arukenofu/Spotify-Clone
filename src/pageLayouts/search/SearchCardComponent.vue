<script setup lang="ts">
import type { ItemTypes, PartialSearchResult } from '@spotify/web-api-ts-sdk'
import { addToHistory } from '@/features/SearchHistory'
import SearchCardDescriptionRenderer from '@/pageLayouts/search/SearchCardDescriptionRenderer.vue'
import MusicCard from '@/shared/UI/Elements/MusicCard.vue'
import { getImageUrlSafe } from '@/shared/utils/image/getImageUrlSafe'

type SearchResultKeys = `${Exclude<ItemTypes, 'track'>}s`

defineProps<{
  item: NonNullable<PartialSearchResult[SearchResultKeys]>['items'][number]
  type: SearchResultKeys
}>()
</script>

<template>
  <MusicCard
    :id="item.id"
    :type="item.type as ItemTypes"
    :name="item.name"
    :image="getImageUrlSafe(item.images, 'medium')"
    :mask-loader-image="getImageUrlSafe(item.images, 'low')"
    @click="addToHistory(item)"
  >
    <SearchCardDescriptionRenderer :entity="item" />
  </MusicCard>
</template>

<style scoped lang="scss">

</style>
