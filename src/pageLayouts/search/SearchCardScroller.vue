<script setup lang="ts">
import type { Artist, ItemTypes, PartialSearchResult } from '@spotify/web-api-ts-sdk'
import { computed } from 'vue'
import { sdk } from '@/services/sdk'
import InfiniteScrollSentinel from '@/shared/components/InfiniteScrollSentinel.vue'
import EntitiesSectionWrapper from '@/shared/UI/EntityPageElements/EntitiesSectionWrapper.vue'

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
  <InfiniteScrollSentinel class="wrapper" @data-update="nextPage">
    <EntitiesSectionWrapper>
      <template
        v-for="item in items"
        :key="item.id"
      >
        <slot :item="item" />
      </template>
    </EntitiesSectionWrapper>
  </InfiniteScrollSentinel>
</template>

<style scoped lang="scss">
.wrapper {
  padding: 0 var(--content-spacing);
}
</style>
