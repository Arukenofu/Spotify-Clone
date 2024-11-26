<script setup lang="ts">
import setTitle from '@/shared/utils/setTitle';
import EntitiesSectionWithHeading from "@/UI/Blocks/EntitiesSectionWithHeading.vue";
import CardRemoveWrapper from "@/UI/Elements/CardRemoveWrapper.vue";
import {useMutation, useQuery, useQueryClient} from "@tanstack/vue-query";
import apiSearchService from "@/services/api/search/apiSearchService";
import MusicCard from "@/UI/Elements/MusicCard.vue";
import type {GetSearchHistoryResult} from "@/services/api/search/types/GetSearchHistoryResult";
import {addToast} from "@/widgets/Toast";
import type {Entities} from "@/services/types/Entities";

setTitle('Spotify — Поиск');

const {data: history} = useQuery({
  queryKey: ['searchHistory'],
  queryFn: async () => {
    return await apiSearchService.getSearchHistory();
  },
  staleTime: 60000
});

const queryClient = useQueryClient();

const {mutate: removeFromHistory} = useMutation({
  mutationFn: async ([id, type, index]: [string | number, Exclude<Entities, 'Track'>, number]) => {
    const data = await apiSearchService.removeFromSearchHistory(id, type);

    if (data.message !== 'OK') {
      throw new Error(data.message);
    }

    queryClient.setQueryData(['searchHistory'], (oldData: GetSearchHistoryResult[]) => {
      const newData = [...oldData];

      newData.splice(index, 1);

      return newData;
    })
  },
  onError: () => {
      addToast('Ошибка при удалении из истории');
  }
});
</script>

<template>
  <section class="searchSection">
    <EntitiesSectionWithHeading
      v-if="history && history.length"
      class="history"
      naming="История поиска"
      href="/recent-searches"
    >
      <CardRemoveWrapper
        v-for="(entity, index) in history"
        :key="index"
        @on-remove="removeFromHistory([entity.id, entity.type, index])"
      >
        <MusicCard
          :id="entity.id"
          :type="entity.type"
          :name="entity.name"
          :image="entity.image"
          :color="entity.color"
        >
          {{entity.description}}
        </MusicCard>
      </CardRemoveWrapper>
    </EntitiesSectionWithHeading>

    <div class="recommended-cards">
      <h1 class="title">
        Всё остальное
      </h1>

      <div class="cards">
        <RouterLink
          v-for="a in 20"
          :key="a"
          class="card"
          :to="`/genre/${a}`"
        >
          <div class="name">
            Музыка
          </div>

          <img
            class="image"
            src="https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb"
            alt="img"
          >
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.searchSection {
  width: 100%;

  .history {
    padding: 0 var(--content-spacing);
  }

  .recommended-cards {
    padding: 0 var(--content-spacing);
    --min-column-width: 300px;

    @media screen and (max-width: 768px) {
      --min-column-width: 150px;

      .title {
        font-size: 1.2rem !important;
      }

      .cards {
        grid-gap: 15px !important;

        .card {
          border-radius: 5px !important;
          aspect-ratio: 2/1.1 !important;

          .name {
            font-size: 1.05rem !important;
            padding: 14px !important;
          }
        }
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

      .card {
        display: block;
        aspect-ratio: 16/9;
        background-color: #45dc60;
        border-radius: 9px;
        position: relative;
        overflow: hidden;

        .name {
          font-weight: 900;
          font-size: 1.5rem;
          padding: 16px;
        }

        .image {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 45%;
          transform: rotate(25deg) translate(18%, -2%);
          border-radius: 4px;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
          z-index: 1;
        }
      }
    }
  }
}
</style>
