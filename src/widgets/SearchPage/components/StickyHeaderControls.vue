<script setup lang="ts">
import StickyHeader from "@/UI/Blocks/StickyHeader.vue";
import BubbleButton from "@/UI/Buttons/BubbleButton.vue";
import {type LocationQuery, type LocationQueryValue, useRoute} from "vue-router";
import {router} from "@/app/router";

const {queries} = defineProps<{
  queries: LocationQuery
}>();

const route = useRoute();

const filters = [
  {
    text: 'Все',
    query: null,
  },
  {
    text: 'Исполнители',
    query: 'artists',
  },
  {
    text: 'Плейлисты',
    query: 'playlists',
  },
  {
    text: 'Треки',
    query: 'tracks',
  },
  {
    text: 'Профили',
    query: 'profiles',
  },
  {
    text: 'Альбомы',
    query: 'albums',
  },
  {
    text: 'Подкасты и шоу',
    query: 'podcastsAndShows',
  }
];

function setFilterQuery(query: LocationQueryValue) {
  const newQueries = {...route.query}

  if (!query) {
    delete newQueries.filter;
  } else {
    newQueries.filter = query;
  }

  router.replace({
    query: newQueries
  });
}

function setActiveFilterQuery(query: LocationQueryValue) {
  if (!query && !queries.filter) {
    return 'active';
  }

  return queries.filter === query ? 'active' : 'default'
}
</script>

<template>
  <StickyHeader
      class="sticky-header"
  >
    <BubbleButton
        class="button"
        v-for="{text, query} in filters"
        :key="text"
        :design="setActiveFilterQuery(query)"
        @click="setFilterQuery(query)"
    >
      {{text}}
    </BubbleButton>
  </StickyHeader>
</template>

<style lang="scss" scoped>
.sticky-header {
  height: 56px;
  padding: 12px var(--content-spacing);
  display: flex;
  gap: 9px;

  .button {
    height: 100%;
  }
}
</style>