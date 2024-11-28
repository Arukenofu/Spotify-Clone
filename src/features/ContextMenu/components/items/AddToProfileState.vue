<script setup lang="ts">
import BasicContextMenuItem from "@/features/ContextMenu/components/defaults/BasicContextMenuItem.vue";
import RoundAvatarIcon from "@/UI/Icons/Shared/RoundAvatarIcon.vue";
import type {BaseItemProps} from "@/features/ContextMenu/types/defaults/BaseItemProps";

defineProps<BaseItemProps & {
  state: boolean
}>();
</script>

<template>
  <BasicContextMenuItem v-bind="$props">
    {{state ? 'Удалить из профиля' : 'Добавить в профиль'}}
    <template #icon>
      <RoundAvatarIcon />
    </template>
  </BasicContextMenuItem>
</template>

<style scoped lang="scss">

</style>