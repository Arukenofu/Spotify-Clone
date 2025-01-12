<script setup lang="ts">
import type {ItemTypes} from "@spotify/web-api-ts-sdk";

defineProps<{
  entity: ItemTypes | 'user';
  entities: {id: string, name: string}[];
}>();

</script>

<template>
  <template
    v-for="(artist, index) in entities"
    :key="artist.id"
  >
    <RouterLink
      :to="`/${entity}/${artist.id}`"
      class="v-link"
      v-bind="$attrs"
    >
      {{artist.name}}
    </RouterLink>
    <template v-if="index !== entities.length-1">,&nbsp;</template>
  </template>
</template>

<style lang="scss">
.v-link {
  color: currentColor;

  &:hover {
    text-decoration: underline;
  }
}
</style>