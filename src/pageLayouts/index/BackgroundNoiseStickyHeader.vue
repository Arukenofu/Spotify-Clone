<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import { BackgroundNoise } from '@/features/BackgroundNoise';
import useCurrentRoutePath from '@/shared/composables/useCurrentRoutePath';
import StickyHeader from '@/UI/Blocks/StickyHeader.vue';

const layoutScrollY = inject('layoutScrollY', ref(0));

const {currentColor} = defineProps<{
  currentColor: string
}>();
defineEmits<{
  setColor: [color: string | null]
}>();

const computeStickyHeaderStyle = computed(() => ({
  opacity: Math.min(layoutScrollY.value / 120, 1),
  backgroundColor: currentColor === 'rgb(83, 83, 83)' ? '#212121' : currentColor,
  transition: 'background-color .25s, opacity .4s ease-out'
}));

const { currentRoutePath } = useCurrentRoutePath('fullPath');
</script>

<template>
  <BackgroundNoise :current-color="currentColor" />

  <StickyHeader
    :underlay-style="computeStickyHeaderStyle"
    class="header"
  >
    <button
      :class="currentRoutePath !== '/' && 'inactive'"
      @click="$router.push(''); $emit('setColor', null)"
    >
      Все
    </button>

    <button
      :class="currentRoutePath !== '/?facet=music-chip' && 'inactive'"
      @click="$router.push('/?facet=music-chip'); $emit('setColor', null);"
    >
      Музыка
    </button>
  </StickyHeader>
</template>

<style scoped lang="scss">
.header {
  padding: 0 var(--content-spacing);

  button {
    padding: 8px 12px;
    border: none;
    border-radius: 500px;
    margin-right: 8px;
    background-color: var(--white);
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    color: var(--black);

    &:active {
      opacity: 0.7;
    }
  }

  .inactive {
    background-color: rgba(255, 255, 255, 0.1);
    color: var(--white);
  }
}
</style>