<script setup lang="ts">
import {BasicContextMenuItem} from "@/features/ContextMenu";
import RoundPlusIcon from "@/UI/Icons/Shared/RoundPlusIcon.vue";
import CheckedRoundCircleIcon from "@/UI/Icons/Shared/CheckedRoundCircleIcon.vue";
import ctxT from "../../helpers/ctx-t";


interface Props {
  state: boolean;
}

defineProps<Props>();
</script>

<template>
  <BasicContextMenuItem :active="state && 'active-icon'">
    <template #icon>
      <Component
        :is="state ? CheckedRoundCircleIcon : RoundPlusIcon"
      />
    </template>
    <template #default>
      {{state ? ctxT('addToFavoriteTracks') : ctxT('removeFromFavoriteTracks')}}
    </template>
  </BasicContextMenuItem>
</template>

<style scoped lang="scss">

</style>