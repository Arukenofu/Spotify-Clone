<script setup lang="ts">
import RecommendationSection from '@/pageLayouts/index/Elements/RecommendationSection.vue';
import MusicCard from '@/UI/Elements/MusicCard.vue';
import {useQuery} from "@tanstack/vue-query";
import {RecommendationService} from "@/services/api/recommendations/recommendationService";

const {data: recommendations} = useQuery({
  queryKey: ['recommendations'],
  queryFn: () => new RecommendationService().getRecommendations()
});
</script>

<template>
  <RecommendationSection 
    v-for="recommendation in recommendations"
    :key="recommendation.sectionId"
    :naming="recommendation.naming"
    class="for-you"
    :href="`/section/${recommendation.sectionId}`"
  >
    <MusicCard
      v-for="music in recommendation.list"
      :key="music.playlistId"
      :playlist-id="music.playlistId"
      :type="recommendation.type"
      :image="music.imageUrl"
      :name="music.name"
      :color="music.color"
    >
      {{music.description}}
    </MusicCard>
  </RecommendationSection>
</template>

<style scoped lang="scss">

</style>