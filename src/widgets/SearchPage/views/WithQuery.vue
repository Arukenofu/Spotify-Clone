<script setup lang="ts">
import type { LocationQuery } from 'vue-router';
import BestResultCard from '@/widgets/SearchPage/components/BestResultCard.vue';

defineProps<{
  queries: LocationQuery;
}>();
</script>

<template>
  <div class="layout">
    <section class="top-result">
      <BestResultCard
        name="Card Title"
        type="Исполнитель"
        who="Moldanazar"
        image="https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb"
        :track-id="1"
        :album-id="0"
      />
      <div class="other" />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  gap: 32px 12px;
  margin-top: 45px;
  padding: 0 var(--content-spacing);
  width: 100%;

  .top-result {
    display: flex;
    width: 100%;
    container: top-results / inline-size;
  }
}
</style>
