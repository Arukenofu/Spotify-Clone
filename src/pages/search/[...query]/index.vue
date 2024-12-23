<script setup lang="ts">
import EntityCard from "@/UI/Elements/EntityCard.vue";
import {useQuery} from "@tanstack/vue-query";
import MusicRow from "@/UI/Elements/Track/TrackRow.vue";
import useMusicUtils from "@/features/MediaPlayer/composables/useMusicUtils";
import EntitiesSectionWithHeading from "@/UI/Blocks/EntitiesSectionWithHeading.vue";
import SearchCardComponent from "@/pageLayouts/search/SearchCardComponent.vue";
import {computed} from "vue";
import LoadingBlock from "@/UI/Blocks/LoadingBlock.vue";
import SearchNotFound from "@/pageLayouts/search/SearchNotFound.vue";
import SearchError from "@/pageLayouts/search/SearchError.vue";
import apiSearchService from "@/services/api/search/apiSearchService";
import {useRoute} from "vue-router";
import {useI18n} from "vue-i18n";

const {t} = useI18n();

const route = useRoute('/search/[...query]/');

const searchQuery = computed(() => route.params.query);

const {data, isSuccess, isLoading} = useQuery({
  queryKey: ['searchAll', searchQuery.value],
  queryFn: async () => {
    return apiSearchService.searchAll(searchQuery.value);
  }
});

const {isThisMusic} = useMusicUtils();
</script>

<template>
  <LoadingBlock v-if="isLoading" />

  <div v-else-if="isSuccess && data" class="recommended-cards">
    <section class="top-result">
      <div class="best-result">
        <div class="title">
          {{t('search.bestResult')}}
        </div>
        <EntityCard
          :id="data.bestResult.id"
          class="card"
          :name="data.bestResult.title"
          :image="data.bestResult.image"
          :artists="data.bestResult.artists"
          :type="data.bestResult.type"
        />
      </div>
      <div class="tracks">
        <div class="title">
          {{t('search.entities.track')}}
        </div>
        <div class="tracks-wrapper">
          <MusicRow
            v-for="track in data.bestResultTracks"
            :key="track.id"
            class="track"
            :is-current="isThisMusic(track.id, false)"
            :is-playing="isThisMusic(track.id, true)"
            :is-added="track.isAddedToFavorites"
            :music-id="track.id"
            :artists="track.artists"
            :music-name="track.name"
            :duration="track.duration"
            :image="track.image"
            :color="track.color"
          />
        </div>
      </div>
    </section>

    <EntitiesSectionWithHeading
      v-if="data.entities.artists?.length"
      :naming="t('search.entities.artist')"
      :href="`/search/${searchQuery}/artists`"
    >
      <SearchCardComponent :item="data.entities.artists" />
    </EntitiesSectionWithHeading>

    <EntitiesSectionWithHeading
      v-if="data.entities.albums?.length"
      :naming="t('search.entities.album')"
      :href="`/search/${searchQuery}/albums`"
    >
      <SearchCardComponent :item="data.entities.albums" />
    </EntitiesSectionWithHeading>

    <EntitiesSectionWithHeading
      v-if="data.entities.playlists?.length"
      :naming="t('search.entities.playlist')"
      :href="`/search/${searchQuery}/playlists`"
    >
      <SearchCardComponent :item="data.entities.playlists" />
    </EntitiesSectionWithHeading>

    <EntitiesSectionWithHeading
      v-if="data.entities.users?.length"
      :naming="t('search.entities.user')"
      :href="`/search/${searchQuery}/users`"
    >
      <SearchCardComponent :item="data.entities.users" />
    </EntitiesSectionWithHeading>
  </div>

  <SearchNotFound v-else-if="isSuccess && !data" :query="searchQuery" />

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