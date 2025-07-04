<script setup lang="ts">
import type { Artist } from '@/services/types/Entities/Artist'
import { useI18n } from 'vue-i18n'
import { AppearModal, Modal } from '@/features/Modal'
import readableNumber from '@/shared/utils/format/readableNumber'

defineProps<Props>()

const { t } = useI18n()

const model = defineModel<boolean>({
  required: true,
})

interface Props {
  subscriptions: Artist['subscriptionsTotalQuantity']
  listeners: Artist['listenersQuantityPerMonth']
  cityPlaybackData: Artist['cityPlaybackData']
  description: Artist['profile']['description']
}
</script>

<template>
  <Modal v-model="model">
    <AppearModal @close="model = false">
      <div class="modal-content">
        <div class="left-clm">
          <div class="stat">
            <div class="title">
              {{ readableNumber(subscriptions) }}
            </div>
            <div class="body">
              {{ t('artist.subscribers', subscriptions) }}
            </div>
          </div>
          <div class="stat">
            <div class="title">
              {{ readableNumber(listeners) }}
            </div>
            <div class="body">
              {{ t('artist.monthlyListeners', listeners) }}
            </div>
          </div>

          <div v-for="data in cityPlaybackData" :key="data.cityName" class="city">
            <div class="title">
              {{ `${data.cityName}, ${data.countryShortName}` }}
            </div>
            <div class="body">
              {{ t('social.listeners', listeners) }}
            </div>
          </div>
        </div>
        <div class="right-clm">
          <p v-if="description">
            {{ description }}
          </p>
        </div>
      </div>
    </AppearModal>
  </Modal>
</template>

<style scoped lang="scss">
.modal-content {
  padding: 40px;
  display: flex;

  .left-clm {
    display: flex;
    flex-direction: column;
    margin-bottom: 32px;
    flex-shrink: 0;

    .stat {
      margin-right: 40px;
      margin-bottom: 40px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 6px;

      .title {
        font-weight: 700;
        font-size: 2rem;
        text-wrap: balance;
      }

      .body {
        font-size: .875rem;
        font-weight: 500;
        color: var(--text-soft);
      }
    }

    .city {
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 7px;

      .title {
        font-weight: 700;
        font-size: .875rem;
        text-wrap: balance;
      }

      .body {
        font-size: .875rem;
        font-weight: 500;
        color: var(--text-soft);
      }
    }
  }

  .right-clm {

    p {
      color: var(--text-soft);
      white-space: pre-wrap;
      font-size: 1rem;
      line-height: 1.5;
      margin-bottom: 16px;
    }
  }
}
</style>
