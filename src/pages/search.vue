<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import setTitle from '@/shared/utils/setTitle';
import { NoQuery, StickyHeaderControls, WithQuery } from '@/widgets/SearchPage';

setTitle('Spotify — Поиск');

const route = useRoute('/search');
const queries = ref(route.query || null);

watch(() => route.query,
  (value) => {
    queries.value = value;
  }
);
</script>

<template>
  <section class="searchSection">
    <StickyHeaderControls
      :queries="queries"
      :style="!queries.q && 'visibility: hidden'"
    />

    <NoQuery v-if="!queries.q" />
    <WithQuery
      v-else
      :queries="queries"
    />
  </section>
</template>

<style lang="scss" scoped>
.searchSection {
  width: 100%;
}
</style>
