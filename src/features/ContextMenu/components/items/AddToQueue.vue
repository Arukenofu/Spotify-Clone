<script setup lang="ts">
import {BasicContextMenuItem} from "@/features/ContextMenu";
import AddToQueueIcon from "@/shared/UI/Icons/AddToQueueIcon.vue";
import ctxT from "../../helpers/ctx-t";
</script>

<template>
  <BasicContextMenuItem v-bind="$props">
    <template #icon>
      <AddToQueueIcon />
    </template>
    {{ctxT('addToProfile')}}
  </BasicContextMenuItem>
</template>

<style scoped lang="scss">

</style>