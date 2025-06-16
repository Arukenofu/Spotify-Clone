<script setup lang="ts" generic="T extends SimplifiedTrack[] | Track[]">
import type { SimplifiedTrack, Track } from '@spotify/web-api-ts-sdk'
import { computed } from 'vue'
import { RecycleScroller } from 'vue-virtual-scroller'

const props = defineProps<{
  list: T
  size: 32 | 56
}>()

const emits = defineEmits<{
  loadMore: []
}>()

const filtered = computed(() => props.list.filter(Boolean))

function onUpdateVisible() {
  emits('loadMore')
}
</script>

<template>
  <div class="v-track-table">
    <RecycleScroller
      v-slot="{ item, index }"
      class="scroller"
      :items="filtered"
      :item-size="size"
      page-mode
      @scroll-end="onUpdateVisible"
    >
      <slot :track="item as T[number]" :index="index" />
    </RecycleScroller>
  </div>
</template>

<style scoped lang="scss">
.v-track-table {
  max-width: var(--content-max-width);
  padding: 0 var(--content-spacing);
  margin: 0 auto;

  .scroller {
    height: 100%;
  }

  :deep(.v-music-row) {
    margin-bottom: var(--content-spacing);
  }
}
</style>
