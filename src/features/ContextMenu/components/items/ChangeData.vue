<script setup lang="ts">
import {BasicContextMenuItem} from "@/features/ContextMenu";
import PencilIcon from "@/UI/Icons/Shared/PencilIcon.vue";
</script>

<template>
  <BasicContextMenuItem v-bind="$props">
    <template #icon>
      <PencilIcon />
    </template>
    Изменение сведений
  </BasicContextMenuItem>
</template>

<style scoped lang="scss">

</style>