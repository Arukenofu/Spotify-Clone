<script setup lang="ts">
import EntityAvatar1x1 from "@/shared/UI/Elements/EntityAvatar1x1.vue";

interface Props {
  id: string | number;
  image: string | null;
  name: string;
}
defineProps<Props>();
</script>

<template>
  <RouterLink class="artist-100" :to="`/artist/${id}`">
    <EntityAvatar1x1 class="img" type="artist" :image />
    <div class="added-at">
      <span class="type">Исполнитель</span>
      <RouterLink class="name" :to="`/artist/${id}`">
        {{name}}
      </RouterLink>
    </div>
  </RouterLink>
</template>

<style scoped lang="scss">
.artist-100 {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  border-radius: 4px;
  padding: 8px;
  user-select: none;

  &:hover {
    background-color: hsla(0,0%,100%,.1);
    text-decoration: none;
  }

  .img {
    height: 80px;
    width: 80px;
    border-radius: 50%;
  }

  .added-at {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;

    .type {
      font-size: .875rem;
      font-weight: 500;
    }

    .name {
      font-size: 1rem;
      font-weight: 700;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>