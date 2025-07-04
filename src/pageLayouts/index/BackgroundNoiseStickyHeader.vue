<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { BackgroundNoise } from '@/features/BackgroundNoise'
import useCurrentRoutePath from '@/shared/composables/useCurrentRoutePath'
import StickyHeader from '@/shared/UI/Blocks/StickyHeader.vue'

const props = defineProps<{
  maskColor: string
}>()

const { t } = useI18n()

const layoutScrollY = inject('layoutScrollY', ref(0))

const computeStickyHeaderStyle = computed(() => ({
  opacity: Math.min(layoutScrollY.value / 120, 1),
  backgroundColor: props.maskColor,
  transition: 'background-color .25s, opacity .4s ease-out',
}))

function isDefaultColor(success: any, fail: any = props.maskColor) {
  return props.maskColor === 'var(--ui)' ? success : fail
}

const { currentRoutePath } = useCurrentRoutePath('fullPath')
</script>

<template>
  <BackgroundNoise :current-color="isDefaultColor('rgb(83, 83, 83)')" />

  <StickyHeader
    :underlay-style="computeStickyHeaderStyle"
    class="header"
  >
    <template v-if="isDefaultColor(false, true)" #filter>
      <div class="filter" />
    </template>

    <div class="inner-content">
      <button
        :class="currentRoutePath !== '/' && 'inactive'"
        @click="$router.push('')"
      >
        {{ t('index-page.facet.all') }}
      </button>

      <button
        :class="currentRoutePath !== '/?facet=music-chip' && 'inactive'"
        @click="$router.push('/?facet=music-chip')"
      >
        {{ t('index-page.facet.music') }}
      </button>
    </div>
  </StickyHeader>
</template>

<style scoped lang="scss">
.header {
  .filter {
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .inner-content {
    max-width: var(--content-max-width);
    width: 100%;
    margin: 0 auto;
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
      line-height: 1.2;

      &:active {
        opacity: 0.7;
      }
    }

    .inactive {
      background-color: rgba(255, 255, 255, 0.1);
      color: var(--white);
    }
  }
}
</style>
