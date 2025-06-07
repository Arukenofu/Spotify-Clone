<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed} from "vue";
import {useQuery, useQueryClient} from "@tanstack/vue-query";
import LoadingBlock from "@/shared/UI/Blocks/LoadingBlock.vue";
import SearchNotFound from "@/pageLayouts/search/SearchNotFound.vue";
import SearchError from "@/pageLayouts/search/SearchError.vue";
import MusicRowHeader from "@/shared/UI/EntityPageElements/MusicRowHeader.vue";
import {sdk} from "@/services/sdk";
import SearchCardComponent from "@/pageLayouts/search/SearchCardComponent.vue";
import {allSearchEntities} from "@/services/sdk/constants/allSearchEntities";
import MusicRow from "@/shared/UI/Elements/Track/TrackRow.vue";
import useMusicUtils from "@/features/MediaPlayer/composables/useMusicUtils";
import getImageFromEntity from "@/shared/utils/getImageFromEntity";
import SearchCardScroller from "@/pageLayouts/search/SearchCardScroller.vue";
import type {PartialSearchResult} from "@spotify/web-api-ts-sdk";

const route = useRoute('/search/[...query]/[...path]');

const query = computed(() => route.params.query);
const path = computed(() => route.params.path);

const entity = computed(() => {
  const output = allSearchEntities.find(value => {
    return path.value === `${value}s`;
  })

  if (!output) return null;

  return output;
});

const queryClient = useQueryClient();

const {
  data,
  isFetching,
  isSuccess,
  error
} = useQuery({
  queryKey: ['searchEntity', query, path],
  queryFn: async () => {
    return sdk.search(query.value, [entity.value!], 'US', 30);
  },
  staleTime: Infinity,
  maxPages: 10,
});

function nextPage(
    newData: NonNullable<PartialSearchResult[keyof PartialSearchResult]>
) {
  queryClient.setQueryData(['searchEntity', query, path], (oldData: PartialSearchResult) => {
    const key: keyof PartialSearchResult = `${entity.value!}s`;

    return {
      [key]: {
        ...oldData[key],
        next: newData.next,
        previous: newData.previous,
        items: newData.items
      }
    }
  })
}

const {isThisMusic} = useMusicUtils();
</script>

<template>
  <LoadingBlock v-if="isFetching" />
  <SearchError v-else-if="error || !entity" />
  <div v-else-if="data" class="recommended-cards">
    <SearchCardScroller
      v-if="entity !== 'track'"
      :data="data"
      :type="`${entity}s`"
      @data-update="nextPage"
    >
      <template #default="{item}">
        <SearchCardComponent :item="item" :type="`${entity}s`" />
      </template>
    </SearchCardScroller>

    <div v-else class="tracks-section">
      <MusicRowHeader class="row-header">
        <template #var1>
          Альбом
        </template>
      </MusicRowHeader>

      <div class="tracks-wrapper">
        <MusicRow
          v-for="(track, index) in data.tracks.items"
          :key="track.id"
          :index="index+1"
          class="track"
          :is-current="isThisMusic(track.id, false)"
          :is-playing="isThisMusic(track.id, true)"
          :is-added="false"
          :music-id="track.id"
          :artists="track.artists.map((value) => ({
            id: value.id,
            name: value.name
          }))"
          :music-name="track.name"
          :duration="track.duration_ms / 1000"
          :image="getImageFromEntity(track.album.images, 2)"
          :color="'#ffffff'"
        />
      </div>
    </div>
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