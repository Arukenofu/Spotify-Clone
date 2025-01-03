<script setup lang="ts">
import {BasicContextMenuItem} from "@/features/ContextMenu";
import DangerIcon2 from "@/shared/UI/Icons/DangerIcon2.vue";
import ctxT from "../../helpers/ctx-t";
</script>

<template>
  <BasicContextMenuItem v-bind="$props">
    <template #icon>
      <DangerIcon2 />
    </template>

    {{ctxT('delete')}}
  </BasicContextMenuItem>
</template>

<style scoped lang="scss">

</style>