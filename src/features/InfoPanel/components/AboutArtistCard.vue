<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import { useI18n } from 'vue-i18n'
import artistService from '@/services/api/artist/apiArtistService'
import SubscribeToArtistButton from '@/shared/UI/Buttons/SubscribeButton.vue'

const { artistId } = defineProps<{
  artistId: number | string
  artistName: string
  coverImage: string | null
  listenersQuantity: number
  description: string | null
}>()

const { t } = useI18n()

const isSubscribed = defineModel<boolean>({
  required: true,
})

const { mutate: toggleArtistSubscription } = useMutation({
  mutationFn: async () => {
    const data = await artistService.toggleArtistSubscription(
      isSubscribed.value,
      artistId,
    )

    if (data.message === 'OK') {
      isSubscribed.value = !isSubscribed.value
    }
  },
})
</script>

<template>
  <div class="artist-info-card">
    <div
      class="artist-image"
      :style="`background-image: linear-gradient(rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 50%), url(${coverImage})`"
    >
      <div class="title">
        {{ t('artist.aboutArtist') }}
      </div>
    </div>
    <div class="about-artist">
      <RouterLink :to="`/artist/${artistId}`" class="artist-name">
        {{ artistName }}
      </RouterLink>
      <div class="secondary">
        <div class="listenings">
          {{ t('social.countPerMonth', [t('social.listeners', listenersQuantity)]) }}
        </div>
        <div class="subscribe-state">
          <SubscribeToArtistButton
            :is-subscribed="isSubscribed"
            @click="toggleArtistSubscription()"
          />
        </div>
      </div>
      <div class="description">
        {{ description }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.artist-info-card {
  width: 100%;
  border-radius: 8px;
  cursor: pointer;
  background-color: var(--ui-highlight);

  .artist-image {
    background-position: 50% 50%;
    background-size: cover;
    border-radius: 8px 8px 0 0;
    padding-bottom: 67%;
    width: 100%;
    position: relative;

    .title {
      position: absolute;
      inset: 0;
      padding: 16px;
      font-weight: 700;
      font-size: 1rem;
    }
  }

  .about-artist {
    padding: 16px;
    margin-bottom: 16px;

    .artist-name {
      display: block;
      font-weight: 700;
      font-size: 1rem;
      line-height: 1.375;
      width: 100%;
    }

    .secondary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px;
      padding-top: 8px;
      padding-bottom: 12px;

      .listenings {
        color: var(--text-soft);
      }

      .subscribe-state {
        width: min-content;
      }
    }

    .description {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      line-clamp: 3;
      -webkit-box-orient: vertical;
      margin-bottom: 8px;
      overflow: hidden;
      overflow-wrap: anywhere;
      text-overflow: ellipsis;
      color: var(--text-soft);
      font-size: .875rem;
      line-height: 1.275;
      font-weight: 500;
    }
  }
}
</style>
