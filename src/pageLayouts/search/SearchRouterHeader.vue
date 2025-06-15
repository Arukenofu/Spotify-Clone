<script setup lang="ts">
import type { ItemTypes } from '@spotify/web-api-ts-sdk'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { router } from '@/app/router'
import StickyHeader from '@/shared/UI/Blocks/StickyHeader.vue'
import BubbleButton from '@/shared/UI/Buttons/BubbleButton.vue'

const props = defineProps<{
  availableRoutes: ItemTypes[]
}>()

const { t } = useI18n()

const route = useRoute('/search/[...query]/[...path]')

function setSearchRouteFilter(path: string) {
  router.push(`/search/${route.params.query}${path}`)
}

const getActiveFilterIndex = computed(() => {
  return props.availableRoutes.findIndex(item => `${item}s` === route.params.path)
})
</script>

<template>
  <StickyHeader class="sticky-header">
    <div class="content">
      <BubbleButton
        class="button"
        :design="!route.params.path ? 'active' : 'default'"
        @click="setSearchRouteFilter('')"
      >
        {{ t('search.entities.all') }}
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
    </div>
  </StickyHeader>
</template>

<style lang="scss" scoped>
.sticky-header {
  background-color: var(--ui);

  .content {
    max-width: var(--content-max-width);
    width: 100%;
    margin: 0 auto;
    padding: 12px var(--content-spacing);
    display: flex;
    gap: 9px;
    height: 56px;

    .button {
      height: 100%;
    }
  }
}
</style>
