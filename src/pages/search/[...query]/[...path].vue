<script setup lang="ts">
import type { PartialSearchResult } from '@spotify/web-api-ts-sdk'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SearchCardComponent from '@/pageLayouts/search/SearchCardComponent.vue'
import SearchCardScroller from '@/pageLayouts/search/SearchCardScroller.vue'
import SearchError from '@/pageLayouts/search/SearchError.vue'
import SearchNotFound from '@/pageLayouts/search/SearchNotFound.vue'
import { sdk } from '@/services/sdk'
import { allSearchEntities } from '@/services/sdk/constants/allSearchEntities'
import LoadingBlock from '@/shared/UI/Blocks/LoadingBlock.vue'
import MusicRow from '@/shared/UI/Elements/Track/TrackRow.vue'
import MusicRowHeader from '@/shared/UI/EntityPageElements/MusicRowHeader.vue'

const route = useRoute('/search/[...query]/[...path]')

const query = computed(() => route.params.query)
const path = computed(() => route.params.path)

const entity = computed(() => {
  const output = allSearchEntities.find((value) => {
    return path.value === `${value}s`
  })

  if (!output)
    return null

  return output
})

const queryClient = useQueryClient()

const {
  data,
  isFetching,
  isSuccess,
  error,
} = useQuery({
  queryKey: ['searchEntity', query, path],
  queryFn: async () => {
    return sdk.search(query.value, [entity.value!], 'US', 30)
  },
  staleTime: Infinity,
  maxPages: 10,
})

function nextPage(
  newData: NonNullable<PartialSearchResult[keyof PartialSearchResult]>,
) {
  queryClient.setQueryData(['searchEntity', query, path], (oldData: PartialSearchResult) => {
    const key: keyof PartialSearchResult = `${entity.value!}s`

    return {
      [key]: {
        ...oldData[key],
        next: newData.next,
        previous: newData.previous,
        items: newData.items,
      },
    }
  })
}
</script>

<template>
  <LoadingBlock v-if="isFetching" />
  <SearchError v-else-if="error || !entity" />
  <div v-else-if="data" class="recommended-cards">
    <div v-if="entity === 'track'" class="tracks-section">
      <MusicRowHeader class="row-header">
        <template #var1>
          Альбом
        </template>
      </MusicRowHeader>

      <div class="tracks-wrapper">
        <MusicRow
          v-for="(track, index) in data.tracks.items"
          :key="track.id"
          :index="index + 1"
          class="track"
          :track="track"
          :is-current="false"
          :is-playing="false"
          :is-added="false"
        />
      </div>
    </div>

    <div v-else-if="entity === 'episode'" />

    <SearchCardScroller
      v-else
      :data="data"
      :type="`${entity}s`"
      @data-update="nextPage"
    >
      <template #default="{ item }">
        <SearchCardComponent :item="item" :type="`${entity}s`" />
      </template>
    </SearchCardScroller>
  </div>
  <SearchNotFound v-else-if="isSuccess && !data![`${entity}s`].items.length" :query />
</template>

<style scoped lang="scss">
.recommended-cards {

  .tracks-section {
    .row-header, .tracks-wrapper .track {
      display: grid;
      grid-template-columns:
          [index] 16px
          [main] minmax(120px, 4fr)
          [var1] minmax(120px, 2fr)
          [var2] 0
          [time] minmax(120px, 1fr);
    }

    .row-header {
      position: sticky;
      top: 56px;
      background-color: var(--ui);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);;
    }

    .tracks-wrapper {
      margin-top: var(--content-spacing);
      padding: 0 var(--content-spacing);

      .track {

        &:hover .album {
          color: var(--white);
        }

        .album {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          line-clamp: 1;
          -webkit-box-orient: vertical;
          white-space: nowrap;
          word-break: break-all;
          overflow: hidden;
          text-overflow: ellipsis;
          color: var(--text-soft);
          font-size: .875rem;
          font-weight: 400;
          user-select: none;
          line-height: 1.5;
          width: min-content;

          &:hover {
            text-decoration: underline !important;
          }
        }
      }
    }
  }
}
</style>
