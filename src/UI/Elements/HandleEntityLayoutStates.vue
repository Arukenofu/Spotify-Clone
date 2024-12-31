<script setup lang="ts">
import LoadingBlock from "@/UI/Blocks/LoadingBlock.vue";
import EntityErrorBlock from "@/UI/Blocks/ErrorBlock.vue";
import type {Entities} from "@/services/types/Entities";
import localizeEntities from "../../services/utils/localizeEntities";

interface Props {
  isFetching: boolean;
  isError: boolean;
  entity: Entities;
}
defineProps<Props>();
</script>

<template>
  <LoadingBlock v-if="isFetching" />
  <EntityErrorBlock
    v-else-if="isError"
  >
    <template #title>
      Не удалось найти {{localizeEntities(entity)}}
    </template>
    <template #body>
      Попробуй поискать что-нибудь другое
    </template>
  </EntityErrorBlock>
</template>

<style scoped lang="scss">

</style>