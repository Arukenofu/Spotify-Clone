<script setup lang="ts">
import LoadingBlock from "@/UI/Blocks/LoadingBlock.vue";
import EntityErrorBlock from "@/UI/Blocks/ErrorBlock.vue";

interface Props {
  isFetching: boolean;
  isError: boolean;
  entity: string;
}
defineProps<Props>();
</script>

<template>
  <LoadingBlock v-if="isFetching" />
  <EntityErrorBlock
    v-else-if="isError"
    :title="`Не удалось найти ${entity}`"
    :body="`Попробуй поискать что-нибудь другое`"
  />
</template>

<style scoped lang="scss">

</style>