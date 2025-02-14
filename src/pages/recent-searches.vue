<script setup lang="ts">
import EntitiesSectionWrapper from "@/shared/UI/EntityPageElements/EntitiesSectionWrapper.vue";
import CardRemoveWrapper from "@/shared/UI/Elements/CardRemoveWrapper.vue";
import MusicCard from "@/shared/UI/Elements/MusicCard.vue";
import {useI18n} from "vue-i18n";
import {clearHistory, getHistory, removeFromHistory} from "@/features/SearchHistory";
import SearchCardDescriptionRenderer from "@/pageLayouts/search/SearchCardDescriptionRenderer.vue";
import type {ItemTypes} from "@spotify/web-api-ts-sdk";
import getImageFromEntity from "@/shared/utils/getImageFromEntity";

const {t} = useI18n();

const history = getHistory()?.reverse();
</script>

<template>
  <div class="layout">
    <div class="heading">
      <h1 class="added-at">{{t('search.searchHistory')}}</h1>
      <button class="clear" @click="clearHistory()">
        {{t('search.cleanHistory')}}
      </button>
    </div>

    <EntitiesSectionWrapper>
      <CardRemoveWrapper
        v-for="(entity, index) in history"
        :key="entity.id"
        @on-remove="removeFromHistory(index)"
      >
        <MusicCard
          :id="entity.id"
          :type="entity.type as ItemTypes"
          :name="entity.name"
          :image="getImageFromEntity(entity.images, 1)"
        >
          <SearchCardDescriptionRenderer :entity="entity" />
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

    .added-at {
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