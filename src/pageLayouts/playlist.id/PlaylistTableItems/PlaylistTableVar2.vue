<script setup lang="ts">
import type {FormatTypes} from "#imports";
import formatRelativeDate from "@/shared/utils/date/formatRelativeDate";

defineProps<{
  albumId: string;
  albumName: string;
  format: FormatTypes;
  addedAt: string;
}>();
</script>

<template>
  <RouterLink
    v-if="format === 'Compact'"
    :to="`/album/${albumId}`"
    class="link"
  >
    {{albumName}}
  </RouterLink>
  <span v-else class="added-at">
    {{formatRelativeDate(addedAt)}}
  </span>
</template>

<style lang="scss">

</style>