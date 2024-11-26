<script setup lang="ts">
import MusicCard from "@/UI/Elements/MusicCard.vue";
import type {RecommendationItem} from "@/services/types/Recommendation";
import {useMutation, useQueryClient} from "@tanstack/vue-query";
import apiSearchService from "@/services/api/search/apiSearchService";

defineProps<{
  item: RecommendationItem[]
}>();

const queryClient = useQueryClient();

const {mutate: addToSearchHistory} = useMutation({
  mutationKey: ['searchHistory'],
  mutationFn: async (data: RecommendationItem) => {
    const response = await apiSearchService.addToSearchHistory(data.id, data.type);

    if (response.message !== 'OK') {
      throw new Error(response.message);
    }

    queryClient.setQueryData(['searchHistory'], (oldData: RecommendationItem[]) => {
      const isExisting = oldData.find(value => {
        return value.id === data.id
      });

      if (isExisting) {
        return;
      }

      const newData = [...oldData];
      newData.push(data);

      return newData;
    });
  },
})
</script>

<template>
  <MusicCard
    v-for="(data, index) in item"
    :id="data.id"
    :key="index"
    :type="data.type"
    :name="data.name"
    :image="data.image"
    :color="data.color"
    @click="addToSearchHistory(data)"
  >
    {{data.description}}
  </MusicCard>
</template>

<style scoped lang="scss">

</style>