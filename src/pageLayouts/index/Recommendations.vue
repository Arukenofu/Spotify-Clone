<script setup lang="ts">
import EntitiesSectionWithHeading from '@/shared/UI/EntityPageElements/EntitiesSectionWithHeading.vue';
import MusicCard from '@/shared/UI/Elements/MusicCard.vue';
import {useQuery} from "@tanstack/vue-query";
import recommendationService from "@/services/api/recommendations/apiRecommendationService";
import type {ItemTypes} from "@spotify/web-api-ts-sdk";

const {data: recommendations} = useQuery({
  queryKey: ['recommendations'],
  queryFn: async () => await recommendationService.getRecommendations()
});
</script>

<template>
  <EntitiesSectionWithHeading
    v-for="recommendation in recommendations"
    :key="recommendation.id"
    :naming="recommendation.naming"
    class="for-you"
    :href="`/section/${recommendation.id}`"
  >
    <MusicCard
      v-for="entity in recommendation.list"
      :id="entity.id"
      :key="entity.id"
      :type="entity.type.toLowerCase() as ItemTypes"
      :image="entity.image"
      :name="entity.name"
      :color="entity.color"
      :state="false"
    >
      {{entity.description}}
    </MusicCard>
  </EntitiesSectionWithHeading>
</template>

<style scoped lang="scss">

</style>