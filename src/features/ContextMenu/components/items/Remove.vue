<script setup lang="ts">
import {BasicContextMenuItem} from "@/features/ContextMenu";
import DangerIcon2 from "@/UI/Icons/Shared/DangerIcon2.vue";
</script>

<template>
  <BasicContextMenuItem v-bind="$props">
    <template #icon>
      <DangerIcon2 />
    </template>

    Удалить
  </BasicContextMenuItem>
</template>

<style scoped lang="scss">

</style>