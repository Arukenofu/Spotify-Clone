<script setup lang="ts">
import type { Categories, ItemTypes } from '@spotify/web-api-ts-sdk'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import getCountryCodeA2 from '@/app/lib/i18n/utils/getCountryCodeA2'
import getLocale from '@/app/lib/i18n/utils/getLocale'
import { history, removeFromHistory } from '@/features/SearchHistory'
import GenreCard from '@/pageLayouts/search/GenreCard.vue'
import SearchMobileSearchBar from '@/pageLayouts/search/mobile/SearchMobileSearchBar.vue'
import SearchCardDescriptionRenderer from '@/pageLayouts/search/SearchCardDescriptionRenderer.vue'
import { sdk } from '@/services/sdk'
import InfiniteScroll from '@/shared/components/InfiniteScroll.vue'
import useResponsive from '@/shared/composables/useResponsive'
import CardRemoveWrapper from '@/shared/UI/Elements/CardRemoveWrapper.vue'
import MusicCard from '@/shared/UI/Elements/MusicCard.vue'
import EntitiesSectionWithHeading from '@/shared/UI/EntityPageElements/EntitiesSectionWithHeading.vue'
import { destroyAccentWorker } from '@/shared/utils/colors/accentColorWorker'
import { getAccentColor } from '@/shared/utils/colors/getAccentColor'
import getImageFromEntity from '@/shared/utils/image/getImageFromEntity'
import { proxy } from '@/shared/utils/proxy'
import setTitle from '@/shared/utils/setTitle'

const { t } = useI18n()

setTitle(t('route-titles.search'))

const { isMobile } = useResponsive()

const queryClient = useQueryClient()

const { data: categories, suspense } = useQuery({
  queryKey: ['categories'],
  queryFn: async () => {
    const data = await sdk.browse.getCategories(getCountryCodeA2(), getLocale())

    const maskColors: (string | null)[] = []

    for (const item of data.categories.items) {
      const color = await getAccentColor(item.icons[0].url)
      maskColors.push(color)
    }

    return {
      ...data.categories,
      maskColors,
    }
  },
})
await suspense()

async function nextPage() {
  const next = categories.value?.next
  if (!next)
    return

  const data = await sdk.makeRequest('GET', next.replace('https://api.spotify.com/v1/', '')) as Categories | undefined
  if (!data)
    return

  const maskColors: (string | null)[] = []

  for (const item of data.categories.items) {
    const color = await getAccentColor(item.icons[0].url)
    maskColors.push(color)
  }

  queryClient.setQueryData(['categories'], (oldData: Categories['categories']) => {
    categories.value
    return {
      ...oldData,
      next: data.categories.next,
      previous: data.categories.previous,
      items: oldData.items.concat(data.categories.items),
      // @ts-ignore
      maskColors: oldData.maskColors.concat(maskColors),
    }
  })
}

onUnmounted(() => {
  destroyAccentWorker()
})
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
          :image="proxy(entity?.images?.[0]?.url)"
          class="music-card"
        >
          <SearchCardDescriptionRenderer :entity="entity" />
        </MusicCard>
      </CardRemoveWrapper>
    </EntitiesSectionWithHeading>

    <div v-if="isMobile" class="mobile-search-bar" @click="$router.push('/search/recent')">
      <h1 class="search-title">
        {{ t('search.search') }}
      </h1>
      <SearchMobileSearchBar disabled />
    </div>

    <div class="recommended-cards">
      <h1 class="title">
        {{ t('search.browseAll') }}
      </h1>

      <InfiniteScroll v-if="categories" class="cards" @data-update="nextPage()">
        <GenreCard
          v-for="(item, index) in categories.items"
          :key="item.id"
          :href="item.href"
          :image="getImageFromEntity(item.icons, 0)!"
          :mask-color="categories.maskColors[index]"
        >
          {{ item.name }}
        </GenreCard>
      </InfiniteScroll>
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
