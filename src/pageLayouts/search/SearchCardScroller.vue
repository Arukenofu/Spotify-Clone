<script setup lang="ts">
import type { Artist, ItemTypes, PartialSearchResult } from '@spotify/web-api-ts-sdk'
import { computed } from 'vue'
import InfiniteScrollSentinel from '@/shared/components/InfiniteScrollSentinel.vue'
import EntitiesSectionWrapper from '@/shared/UI/EntityPageElements/EntitiesSectionWrapper.vue'

type SearchResultKeys = `${Exclude<ItemTypes, 'track'>}s`

const props = defineProps<{
  type: SearchResultKeys
  data: PartialSearchResult
}>()

const emit = defineEmits<{
  dataUpdate: []
}>()

async function nextPage() {
  emit('dataUpdate')
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
