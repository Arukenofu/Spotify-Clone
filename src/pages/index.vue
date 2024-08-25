<script setup lang="ts">
import {computed, inject, ref, type Ref} from "vue";
import PageStickyHeader from "@/UI/Blocks/StickyHeader.vue";
import {BackgroundNoise, useBackgroundNoise} from "@/features/BackgroundNoise";
import useCurrentRoutePath from "@/shared/composables/useCurrentRoutePath";
import RecommendedAlbum from "@/UI/Elements/RecommendedAlbum.vue";

const {currentColor, setColor} = useBackgroundNoise();

const layoutScrollX = inject<Ref<number>>('layoutScrollX', ref(0));

const computeOpacity = computed<number>(() => {
  if (layoutScrollX.value === 0) {
    return 0;
  }

  return Math.min(layoutScrollX.value / 120, 1);
});

const computeBackgroundColor = computed(() => {
  if (currentColor.value === 'rgb(83, 83, 83)') {
    return '#212121'
  }

  return currentColor.value;
});

const {currentRoutePath} = useCurrentRoutePath('fullPath');

const recommendations = [
  {
    id: 0,
    name: 'Микс дня #1',
    avatar: '',
    hoverColor: '#59ff53'
  },
  {
    id: 1,
    name: 'Микс дня #2',
    avatar: '',
    hoverColor: '#f34545'
  },
  {
    id: 2,
    name: 'Микс дня #3',
    avatar: '',
    hoverColor: '#4369e7'
  },
  {
    id: 3,
    name: 'Микс дня #4',
    avatar: '',
    hoverColor: '#ffed3a'
  }
]

</script>

<template>
  <PageStickyHeader
      :underlay-style="{
          opacity: computeOpacity,
          backgroundColor: computeBackgroundColor,
          transition: 'background-color .25s, opacity .4s ease-out'
      }"
      class="header"
  >
    <button
        @click="$router.push('/'); setColor(null)"
        :class="currentRoutePath !== '/' && 'inactive'"
    >
      Все
    </button>

    <button
        @click="$router.push('/?facet=music-chip'); setColor(null)"
        :class="currentRoutePath !== '/?facet=music-chip' && 'inactive'"
    >
      Музыка
    </button>
  </PageStickyHeader>
  <BackgroundNoise
      :currentColor="currentColor"
  />

  <section class="container">
    <section class="recommended-albums">
      <div class="albums-wrap">
        <RecommendedAlbum
            v-for="rec in recommendations"
            :key="rec.id"
            :id="rec.id"
            :album-name="rec.name"
            :avatar="rec.avatar"
            @mouseenter="setColor(rec.hoverColor)"
        />
      </div>
    </section>

  </section>

</template>

<style lang="scss" scoped>
.container {
  padding: 12px var(--content-spacing) 0;

  .recommended-albums {

    .albums-wrap {
      container: recommended-albums / inline-size;

      --album-item-height: 64px;
      --album-min-width: 270px;

      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 8px;
    }
  }
}

@container recommended-albums (min-width: 1141px) {
  .album {
    --album-item-height: 64px !important;
    font-size: 16px !important;

    :deep(.other) {
      padding-left: 16px !important;
    }
  }
}

@container recommended-albums (min-width: 815px) {
  .album {
    --album-item-height: 48px;
    font-size: 14px;
  }
}

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
    transition: all .2s;
    color: var(--black);

    &:active {
      opacity: .7;
    }
  }

  .inactive {
    background-color: rgba(255, 255, 255, 0.1);
    color: var(--white);
  }
}
</style>