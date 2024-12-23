<script setup lang="ts">
import {BasicContextMenuItem} from "@/features/ContextMenu";
import PencilIcon from "@/UI/Icons/Shared/PencilIcon.vue";
import ctxT from "../../helpers/ctx-t";
</script>

<template>
  <BasicContextMenuItem v-bind="$props">
    <template #icon>
      <PencilIcon />
    </template>
    {{ctxT('changeData')}}
  </BasicContextMenuItem>
</template>

<style scoped lang="scss">

</style>