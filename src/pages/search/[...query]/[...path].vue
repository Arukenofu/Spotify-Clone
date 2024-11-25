<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed, inject, type Ref, watch} from "vue";
import {useQuery} from "@tanstack/vue-query";
import apiSearchService from "@/services/api/search/apiSearchService";
import type {Entities} from "@/services/types/Entities";
import LoadingBlock from "@/UI/Blocks/LoadingBlock.vue";
import SearchNotFound from "@/pageLayouts/search/SearchNotFound.vue";
import SearchError from "@/pageLayouts/search/SearchError.vue";
import SearchCardComponent from "@/pageLayouts/search/SearchCardComponent.vue";
import type {RecommendationItem} from "@/services/types/Recommendation";
import MusicRow from "@/UI/Elements/MusicRow.vue";
import type {Track} from "@/services/types/Entities/Track";
import MusicRowHeader from "@/UI/Elements/MusicRowHeader.vue";

const route = useRoute('/search/[...query]/[...path]');

watch(() => route.params.path, () => {
  refetch();
})

const query = computed(() => route.params.query);
const path = computed(() => route.params.path);

const {data, isLoading, refetch} = useQuery({
  queryKey: ['searchEntity', query.value, path.value],
  queryFn: async () => {
    const entity = path.value.charAt(0).toUpperCase() + path.value.slice(1, -1) as Entities;

    return apiSearchService.searchEntity(query.value, entity);
  }
});

const layout = inject<Ref<HTMLElement & {content: HTMLElement}>>('layoutContent');
</script>

<template>
  <LoadingBlock v-if="isLoading" />
  <div v-else-if="data && data.length" class="layout">
    <div v-if="'type' in data[0]" class="entities-wrapper">
      <SearchCardComponent
        :item="data as RecommendationItem[]"
      />
    </div>

    <div v-else class="tracks-section">
      <MusicRowHeader
        class="row-header"
        :var1="'Альбом'"
        :is-var1="true"
        :parent-element="layout!.content"
      />

      <div class="tracks-wrapper">
        <MusicRow
          v-for="(track, index) in data as Track[]"
          :key="track.id"
          :index="index+1"
          :music-id="track.id"
          :music-name="track.name"
          :artists="track.artists"
          :color="track.color"
          :duration="track.duration"
          :image="track.avatar"
          :is-added="false"
          :is-current="false"
          :is-playing="false"
          class="track"
        >
          <template #var1>
            <RouterLink
              v-tooltip="track.album.name"
              class="album"
              :to="`/album/${track.album.id}`"
            >
              {{ track.album.name }}
            </RouterLink>
          </template>
        </MusicRow>
      </div>
    </div>
  </div>
  <SearchNotFound v-else-if="!data?.length" :query />
  <SearchError v-else />
</template>

<style scoped lang="scss">
.layout {
  margin-top: 24px;

  .entities-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    grid-auto-rows: min-content;
    padding: 0 var(--content-spacing);
  }

  .tracks-section {
    height: 1000px;

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
      top: 56px;
      background-color: var(--ui);
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