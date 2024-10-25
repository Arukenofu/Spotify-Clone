<script setup lang="ts">
import RecommendationMix from '@/pageLayouts/index/Elements/RecommendationMix.vue';
import useMusicUtils from "@/features/MediaPlayer/composables/useMusicUtils";
import usePlaylistStore from '@/features/MediaPlayer/store/usePlaylistStore';
import {useMutation, useQuery} from '@tanstack/vue-query';
import {RecommendationService} from '@/services/api/recommendations/recommendationService'

const playlistStore = usePlaylistStore();

const {loadPlaylist, isThisPlaylist} = useMusicUtils();

defineEmits<{
  setColor: [color: null | string]
}>();

const {data: mixes} = useQuery({
  queryKey: ['mixes'],
  queryFn: () => new RecommendationService().getRecommendationMixes()
});

const {mutate: setNewMusic} = useMutation({
  mutationKey: ['playlistInfo', playlistStore.currentPlaylistInfo?.playlistId],
  mutationFn: async (id: number) => await loadPlaylist(id)
});
</script>

<template>
  <section class="recommended-mixes">
    <div class="albums-wrap">
      <RecommendationMix
        v-for="rec in mixes"
        :key="rec.playlistId"
        :playlist-id="rec.playlistId"
        :name="rec.name"
        :image="rec.imageUrl"
        :href="rec.playlistId"
        :state="isThisPlaylist(rec.playlistId, true)"
        :color="rec.color"
        class="album"
        @on-button-click="setNewMusic(rec.playlistId)"
        @mouseenter="$emit('setColor', (rec.color))"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.recommended-mixes {
  container: recommended-albums / inline-size;

  .albums-wrap {
    --album-item-height: 64px;
    --album-min-width: 270px;

    display: grid;
    grid-gap: 8px;
  }
}

@container recommended-albums (min-width: 1141px) {
  .album {
    --album-item-height: 64px;
    font-size: 16px !important;

    :deep(.other) {
      padding-left: 16px !important;
    }
  }
}

@container recommended-albums (min-width: 815px) {
  .albums-wrap {
    --album-item-height: 48px !important;
    font-size: 14px;

    grid-template-columns: repeat(4, 1fr) !important;
  }
}

@container recommended-albums (min-width: 0px) {
  .albums-wrap {
    --album-item-height: 48px !important;
    font-size: 14px;

    grid-template-columns: repeat(2, 1fr);
  }
}
</style>