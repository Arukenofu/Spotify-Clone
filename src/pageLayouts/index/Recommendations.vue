<script setup lang="ts">
import RecommendationSection from '@/UI/Blocks/EntitiesSection.vue';
import MusicCard from '@/UI/Elements/MusicCard.vue';
import {useQuery} from "@tanstack/vue-query";
import recommendationService from "@/services/api/recommendations/apiRecommendationService";
import useMusicUtils from "@/features/MediaPlayer/composables/useMusicUtils";
import type {Entities} from "@/services/types/Entities";

const {data: recommendations} = useQuery({
  queryKey: ['recommendations'],
  queryFn: async () => await recommendationService.getRecommendations()
});

const {loadPlaylist, isThisPlaylist} = useMusicUtils();

function onClick(type: Entities, id: number | string) {
  if (type === 'Artist') {
    return;
  }

  loadPlaylist(id);
}
</script>

<template>
  <RecommendationSection 
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
      :type="entity.type"
      :image="entity.imageUrl"
      :name="entity.name"
      :color="entity.color"
      :state="isThisPlaylist(entity.id, true)"
      @on-play-click="onClick(entity.type, entity.id)"
    >
      {{entity.description}}
    </MusicCard>
  </RecommendationSection>
</template>

<style scoped lang="scss">

</style>