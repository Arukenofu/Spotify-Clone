<script setup lang="ts">
import {computed} from "vue";
import {router} from '@/app/router';
import {useRoute} from 'vue-router';
import StickyHeader from '@/shared/UI/Blocks/StickyHeader.vue';
import BubbleButton from '@/shared/UI/Buttons/BubbleButton.vue';
import {useI18n} from "vue-i18n";

const {t} = useI18n();

const route = useRoute('/search/[...query]/[...path]');

const param = computed(() => {
  return route.params.query.split('/')[0];
});

const filters = [
  {
    id: 'all',
    path: ''
  },
  {
    id: 'playlist',
    path: '/playlists'
  },
  {
    id: 'user',
    path: '/users'
  },
  {
    id: 'track',
    path: '/tracks'
  },
  {
    id: 'album',
    path: '/albums'
  },
  {
    id: 'artist',
    path: '/artists'
  },
] as const;

function setFilterRoute(path: typeof filters[number]['path']) {
  router.push(`/search/${param.value}${path}`);
}

const getActiveColorIndex = computed(() => {
  if (!route.params.path) {
    return 0;
  }

  return filters.findIndex(({path}) => path === `/${route.params.path}`);
});
</script>

<template>
  <StickyHeader class="sticky-header">
    <BubbleButton
      v-for="({ id, path }, index) in filters"
      :key="id"
      class="button"
      :design="getActiveColorIndex === index ? 'active' : 'default'"
      @click="setFilterRoute(path)"
    >
      {{ t(`search.entities.${id}`) }}
    </BubbleButton>
  </StickyHeader>
</template>

<style lang="scss" scoped>
.sticky-header {
  height: 56px;
  padding: 12px var(--content-spacing);
  display: flex;
  gap: 9px;
  background-color: var(--ui);

  .button {
    height: 100%;
  }
}
</style>
