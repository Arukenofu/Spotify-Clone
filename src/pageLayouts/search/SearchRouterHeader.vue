<script setup lang="ts">
import {computed} from "vue";
import {router} from '@/app/router';
import {useRoute} from 'vue-router';
import StickyHeader from '@/UI/Blocks/StickyHeader.vue';
import BubbleButton from '@/UI/Buttons/BubbleButton.vue';

const route = useRoute('/search/[...query]/');

const param = computed(() => {
  return route.params.query.split('/')[0];
});

const filters = [
  {
    name: 'Все',
    path: ''
  },
  {
    name: 'Плейлисты',
    path: '/playlists'
  },
  {
    name: 'Профили',
    path: '/users'
  },
  {
    name: 'Треки',
    path: '/tracks'
  },
  {
    name: 'Альбомы',
    path: '/albums'
  },
  {
    name: 'Исполнители',
    path: '/artists'
  },
] as const;

function setFilterRoute(path: typeof filters[number]['path']) {
  router.push(`/search/${param.value}${path}`);
}

function getActiveColor(path: typeof filters[number]['path']) {
  if (`/search/${param.value}${path}` === route.path) {
    return 'active';
  }
  return 'default';
}
</script>

<template>
  <StickyHeader class="sticky-header">
    <BubbleButton
      v-for="{ name, path } in filters"
      :key="name"
      class="button"
      :design="getActiveColor(path)"
      @click="setFilterRoute(path)"
    >
      {{ name }}
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
