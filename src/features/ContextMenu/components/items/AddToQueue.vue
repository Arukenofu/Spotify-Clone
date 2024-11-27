<script setup lang="ts">
import {BasicContextMenuItem} from "@/features/ContextMenu";
import AddToQueueIcon from "@/UI/Icons/Shared/AddToQueueIcon.vue";
</script>

<template>
  <BasicContextMenuItem v-bind="$props">
    <template #icon>
      <AddToQueueIcon />
    </template>
    Добавить в очередь
  </BasicContextMenuItem>
</template>

<style scoped lang="scss">

</style>