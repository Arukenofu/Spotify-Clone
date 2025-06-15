<script setup lang="ts">
import type { SearchResults } from '@spotify/web-api-ts-sdk'
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import SearchCardComponent from '@/pageLayouts/search/SearchCardComponent.vue'
import SearchError from '@/pageLayouts/search/SearchError.vue'
import SearchNotFound from '@/pageLayouts/search/SearchNotFound.vue'
import { sdk } from '@/services/sdk'
import { allSearchEntities } from '@/services/sdk/constants/allSearchEntities'
import LoadingBlock from '@/shared/UI/Blocks/LoadingBlock.vue'
import EntityCard from '@/shared/UI/Elements/EntityCard.vue'
import MusicRow from '@/shared/UI/Elements/Track/TrackRow.vue'
import EntitiesSectionWithHeading from '@/shared/UI/EntityPageElements/EntitiesSectionWithHeading.vue'

const { t } = useI18n()
const route = useRoute('/search/[...query]/')

const q = computed(() => route.params.query)

const { data, isFetching, isSuccess } = useQuery({
  queryKey: ['search', q],
  queryFn: async () => {
    return sdk.search(q.value, allSearchEntities, 'US', 10)
  },
  staleTime: Infinity,
})

const bestResult = computed(() => {
  if (!data.value?.playlists?.items?.length) {
    return null
  }

  return data.value?.playlists.items[0]
})

const allowedEntitiesSection:
Exclude<(keyof SearchResults<typeof allSearchEntities>), 'tracks'>[] = ['playlists', 'albums', 'artists']
</script>

<template>
  <LoadingBlock v-if="isFetching" />

  <div v-else-if="isSuccess && data" class="recommended-cards">
    <section class="top-result">
      <div v-if="bestResult" class="best-result">
        <div class="title">
          {{ t('search.bestResult') }}
        </div>
        <EntityCard
          :id="bestResult.id"
          class="card"
          :name="bestResult.name"
          :image="bestResult.images[0]?.url"
          :artists="[{
            id: bestResult.owner.id,
            name: bestResult.owner.display_name,
          }]"
          type="Playlist"
        />
      </div>
      <div class="tracks">
        <div class="title">
          {{ t('search.entities.track') }}
        </div>
        <div v-if="data.tracks" class="tracks-wrapper">
          <MusicRow
            v-for="track in data.tracks.items.slice(0, 4)"
            :key="track.id"
            class="track"
            :track="track"
            :is-current="false"
            :is-playing="false"
            :is-added="false"
          />
        </div>
      </div>
    </section>

    <template
      v-for="entity in allowedEntitiesSection"
      :key="entity"
    >
      <EntitiesSectionWithHeading
        v-if="data[entity]!.items.length"
        :naming="t(`search.entities.${entity.slice(0, -1)}`)"
        :href="`/search/${q}/${entity}`"
      >
        <template v-for="item in data[entity]!.items" :key="item?.id">
          <SearchCardComponent
            v-if="item"
            :item="item"
            :type="entity"
          />
        </template>
      </EntitiesSectionWithHeading>
    </template>
  </div>

  <SearchNotFound v-else-if="isSuccess && !data" :query="q" />

  <SearchError v-else />
</template>

<style scoped lang="scss">
.recommended-cards {
  gap: 32px 12px;
  margin-top: 45px;
  padding: 0 var(--content-spacing);
  width: 100%;

  .top-result {
    display: flex;
    width: 100%;
    container: top-results / inline-size;
    gap: 12px;

    .best-result, .tracks {
      .title {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 12px;
      }
    }

    .best-result {
      width: 35%;
      height: min-content;

      @container top-results (max-width: 1000px) {
        & {
          width: 50%;
        }
      }

      .card {
        min-height: 230px;
      }
    }

    .tracks {
      flex: 1;

      .tracks-wrapper {
        .track {
          display: grid;
          grid-template-columns:
              [index] 0
              [main] minmax(120px, 4fr)
              [var1] minmax(120px, 2fr)
              [var2] 0
              [time] minmax(120px, 1fr);
          width: 100%;
          grid-gap: 0;
        }
      }
    }
  }
}
</style>
