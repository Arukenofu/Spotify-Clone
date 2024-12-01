<script setup lang="ts">
import getDeclention from "@/shared/utils/getDeclention";
import SubscribeToArtistButton from "@/UI/Buttons/SubscribeButton.vue";
import {useMutation} from "@tanstack/vue-query";
import artistService from "@/services/api/artist/apiArtistService";

const {artistId} = defineProps<{
  artistId: number | string;
  artistName: string;
  coverImage: string | null;
  listenersQuantity: number;
  description: string | null;
}>();

const isSubscribed = defineModel<boolean>({
  required: true
});

const {mutate: toggleArtistSubscription} = useMutation({
  mutationFn: async () => {
    const data = await artistService.toggleArtistSubscription(
        isSubscribed.value,
        artistId
    );

    if (data.message === 'OK') {
      isSubscribed.value = !isSubscribed.value
    }
  }
});
</script>

<template>
  <div class="artist-info-card">
    <div
      class="artist-image"
      :style="`background-image: linear-gradient(rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 50%), url(${coverImage})`"
    >
      <div class="title">Об исполнителе</div>
    </div>
    <div class="about-artist">
      <RouterLink :to="`/artist/${artistId}`" class="artist-name">
        {{artistName}}
      </RouterLink>
      <div class="secondary">
        <div class="listenings">
          {{
            getDeclention(listenersQuantity, 'слушатель', 'слушателя', 'слушателей', 'readable')
          }} в месяц
        </div>
        <div class="subscribe-state">
          <SubscribeToArtistButton
            :is-subscribed="isSubscribed"
            @click="toggleArtistSubscription()"
          />
        </div>
      </div>
      <div class="description">
        {{description}}
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
    aspect-ratio: 16/10;
    width: 100%;

    .title {
      padding: 16px;
      height: 25px;
      font-weight: 700;
      font-size: 1rem;
    }
  }

  .about-artist {
    padding: 16px;
    margin-bottom: 16px;

    .artist-name {
      font-weight: 700;
      font-size: 1rem;
    }

    .secondary {
      display: flex;
      align-items: center;
      gap: 8px;
      height: 52px;
      justify-content: space-between;

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
      font-weight: 400;
    }
  }
}
</style>