<script setup lang="ts">
import type { Artist, ItemTypes, PartialSearchResult } from '@spotify/web-api-ts-sdk'
import { computed } from 'vue'
import { sdk } from '@/services/sdk'
import InfiniteScroll from '@/shared/components/InfiniteScroll.vue'

type SearchResultKeys = `${Exclude<ItemTypes, 'track'>}s`

const props = defineProps<{
  type: SearchResultKeys
  data: PartialSearchResult
}>()

const emit = defineEmits<{
  dataUpdate: [value: NonNullable<PartialSearchResult[keyof PartialSearchResult]>]
}>()

async function nextPage() {
  const item = props.data[props.type]!
  const data
    = (await sdk.makeRequest('GET', item.next?.replace('https://api.spotify.com/v1/', '') || '')) as PartialSearchResult | undefined

  if (!data)
    return
  const dataItem = data[props.type]!

  emit('dataUpdate', {
    ...item,
    next: dataItem.next,
    previous: dataItem.previous,
    // @ts-ignore
    items: item.items.concat(dataItem.items),
  })
}

const items = computed(() => {
  return props.data[props.type]!.items.filter((item: any) => item !== null) as Artist[]
})
</script>

<template>
  <InfiniteScroll class="wrapper" @data-update="nextPage()">
    <template
      v-for="item in items"
      :key="item.id"
    >
      <slot :item="item" />
    </template>
  </InfiniteScroll>
</template>

<style scoped lang="scss">
.wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  grid-auto-rows: min-content;
  padding: 0 var(--content-spacing);
}
</style>
