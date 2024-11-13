<script setup lang="ts">
import BasicContextMenuView from "@/UI/ContextMenu/BasicContextMenuView.vue";
import BasicContextMenuItem from "@/UI/ContextMenu/BasicContextMenuItem.vue";
import {RouterLink} from "vue-router";
import {router} from "@/app/router";

function exitFromAccount() {
  router.push(`/signup`)
}
</script>

<template>
  <BasicContextMenuView class="modal">
    <BasicContextMenuItem>
      Аккаунт
    </BasicContextMenuItem>
    <BasicContextMenuItem :as="RouterLink" to="/user/asd">
      Профиль
    </BasicContextMenuItem>
    <BasicContextMenuItem :as="RouterLink" to="/preferences" underline>
      Настройки
    </BasicContextMenuItem>
    <BasicContextMenuItem @click="exitFromAccount">
      Выйти
    </BasicContextMenuItem>
  </BasicContextMenuView>
</template>

<style lang="scss" scoped>
.modal {
  width: 180px;

  &:deep(.c-menu-item) {
    height: 43.2px;
    font-weight: 500;
  }

  &:deep(a) {
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
