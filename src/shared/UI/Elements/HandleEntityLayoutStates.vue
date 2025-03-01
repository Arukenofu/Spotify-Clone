<script setup lang="ts">
import LoadingBlock from "@/shared/UI/Blocks/LoadingBlock.vue";
import EntityErrorBlock from "@/shared/UI/Blocks/ErrorBlock.vue";
import localizeEntities from "@/services/utils/localizeEntities";
import type {ItemTypes} from "@spotify/web-api-ts-sdk";
import ttt from "@/app/lib/i18n/utils/ttt";

interface Props {
  isFetching: boolean;
  isError: boolean;
  entity: ItemTypes | 'user';
}
defineProps<Props>();
</script>

<template>
  <LoadingBlock v-if="isFetching" />
  <EntityErrorBlock
    v-else-if="isError"
  >
    <template #title>
      {{ttt('errors.cannotFindEntity', [localizeEntities(entity).toLowerCase()])}}
    </template>
    <template #body>
      {{ttt('errors.tryLookingSomethingElse')}}
    </template>
  </EntityErrorBlock>

  <template v-else>
    <slot />
  </template>
</template>

<style scoped lang="scss">

</style>