<script setup lang="ts">
import type { ItemTypes } from '@spotify/web-api-ts-sdk'

defineProps<{
  entity: ItemTypes | 'user'
  entities: { id: string, name: string }[]
}>()
</script>

<template>
  <span
    v-for="(artist, index) in entities"
    :key="artist.id"
    class="comma-separated"
    v-bind="$attrs"
  >
    <RouterLink
      :to="`/${entity}/${artist.id}`"
      class="v-link"
    >
      {{ artist.name }}
    </RouterLink><span v-if="index !== entities.length - 1" class="comma">,&nbsp;</span>
  </span>
</template>

<style lang="scss">
.comma-separated {
  color: currentColor;

  .comma {
    color: currentColor;
  }

  .v-link {
    color: currentColor;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
