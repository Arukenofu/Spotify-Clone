<script setup lang="ts">
import EntitiesSectionWrapper from "@/shared/UI/Blocks/EntitiesSectionWrapper.vue";
import {useMutation, useQuery, useQueryClient} from "@tanstack/vue-query";
import apiSearchService from "@/services/api/search/apiSearchService";
import CardRemoveWrapper from "@/shared/UI/Elements/CardRemoveWrapper.vue";
import MusicCard from "@/shared/UI/Elements/MusicCard.vue";
import type {GetSearchHistoryResult} from "@/services/api/search/types/GetSearchHistoryResult";
import {router} from "@/app/router";
import type {Entities} from "@/services/types/Entities";
import {useI18n} from "vue-i18n";

const {t} = useI18n();

const {data: history} = useQuery({
  queryKey: ['searchHistory'],
  queryFn: async () => {
    return await apiSearchService.getSearchHistory();
  }
});

const queryClient = useQueryClient();

const {mutate: removeFromHistory} = useMutation({
  mutationKey: ['searchHistory'],
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
});

const {mutate: cleanSearchHistory} = useMutation({
  mutationKey: ['searchHistory'],
  mutationFn: async () => {
    return await apiSearchService.cleanSearchHistory();
  },
  onSuccess: async () => {
    queryClient.setQueryData(['searchHistory'], () => {
      return [];
    });

    await router.push('/search')
  }
})
</script>

<template>
  <div class="layout">
    <div class="heading">
      <h1 class="text">{{t('search.searchHistory')}}</h1>
      <button class="clear" @click="cleanSearchHistory()">
        {{t('search.cleanHistory')}}
      </button>
    </div>

    <EntitiesSectionWrapper min-column-width="180px" min-rows="auto">
      <CardRemoveWrapper
        v-for="(entity, index) in history"
        :key="entity.id"
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
    </EntitiesSectionWrapper>
  </div>
</template>

<style scoped lang="scss">
.layout {
  margin-top: 32px;
  padding: 0 var(--content-spacing);

  .heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;

    .text {
      font-weight: 700;
      font-size: 1.5rem;
    }

    .clear {
      background: none;
      border: none;
      height: 48px;
      color: var(--text-soft);
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      text-align: center;
      user-select: none;
      transition-property: color, opacity, transform;
      transition-duration: 33ms;

      &:hover {
        color: var(--white);
        transform: scale(1.04);
      }

      &:active {
        opacity: .7;
        transform: scale(1) !important;
        color: var(--text-soft);
      }
    }
  }
}
</style>