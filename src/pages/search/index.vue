<script setup lang="ts">
import setTitle from '@/shared/utils/setTitle';
import EntitiesSectionWithHeading from "@/shared/UI/EntityPageElements/EntitiesSectionWithHeading.vue";
import CardRemoveWrapper from "@/shared/UI/Elements/CardRemoveWrapper.vue";
import {useQuery} from "@tanstack/vue-query";
import MusicCard from "@/shared/UI/Elements/MusicCard.vue";
import useResponsive from "@/shared/composables/useResponsive";
import SearchMobileSearchBar from "@/pageLayouts/search/mobile/SearchMobileSearchBar.vue";
import {useI18n} from "vue-i18n";
import {sdk} from "@/services/sdk";
import getLocale from "@/app/lib/i18n/utils/getLocale";
import getCountryCodeA2 from "@/app/lib/i18n/utils/getCountryCodeA2";
import getAsyncPalette from "@/shared/utils/getAsyncPalette";
import GenreCard from "@/pageLayouts/search/GenreCard.vue";
import getImageFromEntity from "@/shared/utils/getImageFromEntity";
import {getHistory, removeFromHistory} from "@/features/SearchHistory";
import SearchCardDescriptionRenderer from "@/pageLayouts/search/SearchCardDescriptionRenderer.vue";
import type {ItemTypes} from "@spotify/web-api-ts-sdk";

const {t} = useI18n();

setTitle(t('route-titles.search'));

const {isMobile} = useResponsive();
const history = getHistory();

const {data: categories} = useQuery({
  queryKey: ['categories'],
  queryFn: async () => {
    const data = await sdk.browse.getCategories(getCountryCodeA2(), getLocale());

    const maskColors: (string | null)[] = [];

    for (const item of data.categories.items) {
      const palettes = await getAsyncPalette(item.icons[0].url);
      maskColors.push(palettes.Vibrant?.hex ?? null);
    }

    return {
      ...data.categories,
      maskColors
    };
  }
});
</script>

<template>
  <section class="searchSection">
    <EntitiesSectionWithHeading
      v-if="history && history.length && !isMobile"
      class="history"
      :naming="t('search.searchHistory')"
      href="/recent-searches"
    >
      <CardRemoveWrapper
        v-for="(entity, index) in history"
        :key="index"
        @on-remove="removeFromHistory(index)"
      >
        <MusicCard
          :id="entity.id"
          :type="entity.type as ItemTypes"
          :name="entity.name"
          :image="getImageFromEntity(entity.images)"
          class="music-card"
        >
          <SearchCardDescriptionRenderer :entity="entity" />
        </MusicCard>
      </CardRemoveWrapper>
    </EntitiesSectionWithHeading>

    <div v-if="isMobile" class="mobile-search-bar" @click="$router.push('/search/recent')">
      <h1 class="search-title">{{t('search.search')}}</h1>
      <SearchMobileSearchBar disabled />
    </div>

    <div class="recommended-cards">
      <h1 class="title">
        {{t('search.browseAll')}}
      </h1>

      <div v-if="categories" class="cards">
        <GenreCard 
          v-for="(item, index) in categories.items"
          :id="item.id"
          :key="item.id"
          :image="getImageFromEntity(item.icons, 0)!"
          :mask-color="categories.maskColors[index]"
        >
          {{item.name}}
        </GenreCard>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.searchSection {
  width: 100%;
  max-width: var(--content-max-width);
  margin: 0 auto;

  .history {
    padding: 0 var(--content-spacing);
  }

  .mobile-search-bar {
    padding: 0 var(--content-spacing);

    .search-title {
      font-weight: 700;
      padding-top: 45px;
      margin-bottom: 21px;
    }
  }

  .recommended-cards {
    padding: 0 var(--content-spacing);
    --min-column-width: 260px;

    @media screen and (max-width: 768px) {
      .title {
        font-size: 1.2rem !important;
      }
    }

    .title {
      font-size: 1.5rem;
      margin-top: 24px;
      margin-bottom: 24px;
      font-weight: 900;
      width: 100%;
    }

    .cards {
      display: grid;
      grid-gap: 24px;
      grid-auto-rows: min-content;
      grid-template-columns: repeat(auto-fill, minmax(var(--min-column-width), 1fr));
    }
  }
}
</style>
