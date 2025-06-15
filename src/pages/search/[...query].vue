<script setup lang="ts">
import type { ItemTypes } from '@spotify/web-api-ts-sdk'
import { useQuery } from '@tanstack/vue-query'
import { computed, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import SearchRouterHeader from '@/pageLayouts/search/SearchRouterHeader.vue'
import { sdk } from '@/services/sdk'
import { allSearchEntities } from '@/services/sdk/constants/allSearchEntities'
import { destroyAccentWorker } from '@/shared/utils/colors/accentColorWorker'

const route = useRoute('/search/[...query]/[...path]')
const q = computed(() => {
  return route.params.query
})

const { data, suspense } = useQuery({
  queryKey: ['search', q],
  queryFn: async () => {
    return sdk.search(q.value, allSearchEntities, 'US', 10)
  },
  staleTime: Infinity,
})
await suspense()

function getAvailableSearchEntities() {
  const output: ItemTypes[] = []

  allSearchEntities.forEach((key) => {
    // @ts-ignore
    if (data.value![`${key}s`].items.length) {
      output.push(key)
    }
  })

  return output
}

onUnmounted(() => {
  destroyAccentWorker()
})
</script>

<template>
  <template v-if="data">
    <SearchRouterHeader :available-routes="getAvailableSearchEntities()" />
    <div class="search">
      <RouterView />
    </div>
  </template>
</template>

<style scoped lang="scss">
.search {
  max-width: var(--content-max-width);
  margin: 0 auto;
}
</style>
