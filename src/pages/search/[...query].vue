<script setup lang="ts">
import SearchRouterHeader from "@/pageLayouts/search/SearchRouterHeader.vue";
import {useQuery} from "@tanstack/vue-query";
import {sdk} from "@/services/sdk";
import {useRoute} from "vue-router";
import {computed} from "vue";
import {allSearchEntities} from "@/services/sdk/constants/allSearchEntities";
import type {ItemTypes} from "@spotify/web-api-ts-sdk";

const route = useRoute('/search/[...query]/[...path]');
const q = computed(() => {
  return route.params.query;
});

const {data, suspense} = useQuery({
  queryKey: ['search', q],
  queryFn: async () => {
    return sdk.search(q.value, allSearchEntities, 'US', 10);
  },
  staleTime: Infinity
});
await suspense();

function getAvailableSearchEntities() {
  const output: ItemTypes[] = [];

  allSearchEntities.forEach((key) => {
    // @ts-ignore
    if (data.value![key + 's'].items.length) {
      output.push(key);
    }
  });

  return output;
}
</script>

<template>
  <div v-if="data" class="search">
    <SearchRouterHeader :available-routes="getAvailableSearchEntities()" />

    <RouterView />
  </div>
</template>

<style scoped lang="scss">
.search {
  height: 100%;
}
</style>