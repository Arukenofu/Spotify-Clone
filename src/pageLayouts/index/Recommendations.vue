<script setup lang="ts">
import EntitiesSectionWithHeading from '@/shared/UI/Blocks/EntitiesSectionWithHeading.vue';
import MusicCard from '@/shared/UI/Elements/MusicCard.vue';
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
      :type="entity.type"
      :image="entity.image"
      :name="entity.name"
      :color="entity.color"
      :state="isThisPlaylist(entity.id, true)"
      @on-play-click="onClick(entity.type, entity.id)"
    >
      {{entity.description}}
    </MusicCard>
  </EntitiesSectionWithHeading>
</template>

<style scoped lang="scss">

</style>