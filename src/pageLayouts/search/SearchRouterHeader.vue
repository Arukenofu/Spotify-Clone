<script setup lang="ts">
import {computed} from "vue";
import {router} from '@/app/router';
import {useRoute} from 'vue-router';
import StickyHeader from '@/shared/UI/Blocks/StickyHeader.vue';
import BubbleButton from '@/shared/UI/Buttons/BubbleButton.vue';
import {useI18n} from "vue-i18n";
import type {ItemTypes} from "@spotify/web-api-ts-sdk";

const {t} = useI18n();

const props = defineProps<{
  availableRoutes: ItemTypes[]
}>();

const route = useRoute('/search/[...query]/[...path]');

function setSearchRouteFilter(path: string) {
  router.push(`/search/${route.params.query}${path}`);
}

const getActiveFilterIndex = computed(() => {
  return props.availableRoutes.findIndex((item) => item + 's' === route.params.path);
});
</script>

<template>
  <StickyHeader class="sticky-header">
    <BubbleButton
      class="button"
      :design="!route.params.path ? 'active' : 'default'"
      @click="setSearchRouteFilter('')"
    >
      {{t('search.entities.all')}}
    </BubbleButton>

    <BubbleButton
      v-for="(availableRoute, index) in props.availableRoutes"
      :key="availableRoute"
      class="button"
      :design="getActiveFilterIndex === index ? 'active' : 'default'"
      @click="setSearchRouteFilter(`/${availableRoute}s`)"
    >
      {{ t(`search.entities.${availableRoute}`) }}
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
