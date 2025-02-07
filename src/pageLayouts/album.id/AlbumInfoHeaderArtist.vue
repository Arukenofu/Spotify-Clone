<script setup lang="ts">
import getImageFromEntity from "@/shared/utils/getImageFromEntity";
import EntityAvatar1x1 from "@/shared/UI/Elements/EntityAvatar1x1.vue";
import type {Album} from "@spotify/web-api-ts-sdk";

defineProps<{
  creator: Album['artists'],
}>();
</script>

<template>
  <div v-if="creator.length === 1" class="single-artist">
    <EntityAvatar1x1
      :image="getImageFromEntity(creator[0].images, 1)"
      class="artist-img"
      type="artist"
    />
    <RouterLink :to="`/artist/${creator[0].id}`" class="name">
      {{creator[0].name}}
    </RouterLink>
  </div>
  <div v-else class="artists">
    <template
      v-for="(artist, index) in creator"
      :key="artist.id"
    >
      <RouterLink
        :to="`/artist/${artist.id}`"
        class="artist"
      >
        {{artist.name}}
      </RouterLink>

      <template v-if="index !== creator.length-1">&nbsp;•&nbsp;</template>
    </template>
  </div>
</template>

<style scoped lang="scss">
.single-artist {
  display: inline-flex;
  align-items: center;
  gap: 3px;

  .artist-img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  .name {
    color: var(--white);
    font-weight: 700;

    &:hover {
      text-decoration: underline;
    }
  }
}

.artists {
  display: inline-flex;
  align-items: center;

  .artist {
    color: var(--white);
    font-weight: 700;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>