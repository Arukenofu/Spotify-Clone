<script setup lang="ts">
import BasicContextMenuView from "@/UI/ContextMenu/BasicContextMenuView.vue";
import BasicContextMenuItem from "@/UI/ContextMenu/BasicContextMenuItem.vue";
import {RouterLink} from "vue-router";
</script>

<template>
  <BasicContextMenuView class="modal">
    <BasicContextMenuItem text="Аккаунт" />
    <BasicContextMenuItem :as="RouterLink" to="/user/asd" text="Профиль" />
    <BasicContextMenuItem :as="RouterLink" to="/preferences" text="Настройки" :underline="true" />
    <BasicContextMenuItem text="Выйти" />
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
