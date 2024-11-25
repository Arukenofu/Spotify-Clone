<script setup lang="ts">
import MusicCard from "@/UI/Elements/MusicCard.vue";
import type {RecommendationItem} from "@/services/types/Recommendation";

defineProps<{
  item: RecommendationItem[]
}>();
</script>

<template>
  <MusicCard
    v-for="{id, type, name, description} in item"
    :id="id"
    :key="id"
    :type="type"
    :name="name"
  >
    {{description}}
  </MusicCard>
</template>

<style scoped lang="scss">

</style>