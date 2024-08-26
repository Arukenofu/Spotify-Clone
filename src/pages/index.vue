<script setup lang="ts">
import {computed, inject, ref, type Ref} from "vue";
import PageStickyHeader from "@/UI/Blocks/StickyHeader.vue";
import {BackgroundNoise, useBackgroundNoise} from "@/features/BackgroundNoise";
import useCurrentRoutePath from "@/shared/composables/useCurrentRoutePath";
import RecommendedAlbum from "@/UI/Elements/RecommendedAlbum.vue";
import RecommendationSection from "@/UI/Elements/RecommendationSection.vue";
import MusicCard from "@/UI/Elements/MusicCard.vue";

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
    avatar: 'https://cameralabs.org/media/lab18/03/02/arhiv-muzykalnyh-oblozhek_4.jpg',
    hoverColor: '#11342b',
    href: '/asd'
  },
  {
    id: 1,
    name: 'Микс дня #2',
    avatar: 'https://inde.io/uploads/1f9953e88ceae76aa8af90498bc91b90.png',
    hoverColor: '#c63b34',
    href: '/asd'
  },
  {
    id: 2,
    name: 'Микс дня #3',
    avatar: 'https://pult.ru/upload/medialibrary/5ee/5eee4b14e41c7b041d127204557242ec.jpg',
    hoverColor: '#1077a7',
    href: '/asd'
  },
  {
    id: 3,
    name: 'Микс дня #4',
    avatar: 'https://avatars.dzeninfra.ru/get-zen_doc/1708669/pub_5d20c72970080e00aee0b858_5d20c77091645e00ac348023/scale_1200',
    hoverColor: '#e2d840',
    href: '/asd'
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
            class="album"
            v-for="rec in recommendations"
            :key="rec.id"
            :id="rec.id"
            :album-name="rec.name"
            :avatar="rec.avatar"
            :href="rec.href"
            @mouseenter="setColor(rec.hoverColor)"
        />
      </div>
    </section>

    <RecommendationSection
        class="for-you"
        naming="Только для тебя, Бауыржан Алкенов"
        href="/section/1"
    >
      <MusicCard
          :album-id="1"
          to="/hello"
          type="playlist"
          name="Only for you"
          :show-name="false"
          v-for="a in 10"
          :key="a"
      >
        Новые треки и редкие композиции в еженедельном миксе специально для тебя. Лови обновление каждый понедельник.
      </MusicCard>
    </RecommendationSection>


    <RecommendationSection naming="Популярные исполнители" href="/asdasdas">
      <MusicCard
          :album-id="1"
          name="The Weekend"
          to="/artistName"
          type="artist"
          v-for="a in 10"
          :key="a"
      >
        Исполнитель
      </MusicCard>
    </RecommendationSection>

    <RecommendationSection
        naming="Вам должно понравиться"
        head-title="По мотивам твоих недавних действий"
        href="/liked"
    >
      <MusicCard
          :album-id="1"
          :show-name="false"
          name="Music"
          to="/musicName"
          v-for="a in 10"
          :key="a"
      >
        The greatest indie love songs of all time.
      </MusicCard>
    </RecommendationSection>
  </section>

</template>

<style lang="scss" scoped>
.container {
  padding: 12px var(--content-spacing) 0;
  display: grid;
  gap: 24px 32px;
  padding-bottom: 32px;

  .recommended-albums {
    container: recommended-albums / inline-size;

    .albums-wrap {
      --album-item-height: 64px;
      --album-min-width: 270px;

      display: grid;
      grid-gap: 8px;
    }
  }
}

  @container recommended-albums (min-width: 1141px) {
    .album {
      --album-item-height: 64px;
      font-size: 16px !important;

      :deep(.other) {
        padding-left: 16px !important;
      }
    }
  }

@container recommended-albums (min-width: 815px) {
  .albums-wrap {
    --album-item-height: 48px !important;
    font-size: 14px;

    grid-template-columns: repeat(4, 1fr) !important;
  }
}

@container recommended-albums (min-width: 0px) {
  .albums-wrap {
    --album-item-height: 48px !important;
    font-size: 14px;

    grid-template-columns: repeat(2, 1fr);
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