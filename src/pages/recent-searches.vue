<script setup lang="ts">
import type { ItemTypes } from '@spotify/web-api-ts-sdk'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { router } from '@/app/router'
import { clearHistory, history, removeFromHistory } from '@/features/SearchHistory'
import SearchCardDescriptionRenderer from '@/pageLayouts/search/SearchCardDescriptionRenderer.vue'
import CardRemoveWrapper from '@/shared/UI/Elements/CardRemoveWrapper.vue'
import MusicCard from '@/shared/UI/Elements/MusicCard.vue'
import EntitiesSectionWrapper from '@/shared/UI/EntityPageElements/EntitiesSectionWrapper.vue'
import getImageFromEntity from '@/shared/utils/image/getImageFromEntity'

const { t } = useI18n()

watch(history, ({ length }) => {
  !length && router.push('/search')
})
</script>

<template>
  <div v-if="history.length" class="layout">
    <div class="heading">
      <h1 class="added-at">
        {{ t('search.searchHistory') }}
      </h1>
      <button class="clear" @click="clearHistory()">
        {{ t('search.cleanHistory') }}
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
  margin-right: 16px;
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
