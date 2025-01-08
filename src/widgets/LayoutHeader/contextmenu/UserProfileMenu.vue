<script setup lang="ts">
import {BasicContextMenuItem, BasicContextMenuView} from "@/features/ContextMenu";
import {RouterLink} from "vue-router";
import {router} from "@/app/router";
import {useI18n} from "vue-i18n";

const {t} = useI18n();

defineProps<{
  userid: string;
}>()

function exitFromAccount() {
  router.push(`/signup`)
}
</script>

<template>
  <BasicContextMenuView class="modal">
    <BasicContextMenuItem>
      {{t('app-header.user.account')}}
    </BasicContextMenuItem>
    <BasicContextMenuItem :as="RouterLink" :to="`/user/${userid}`">
      {{t('app-header.user.profile')}}
    </BasicContextMenuItem>
    <BasicContextMenuItem :as="RouterLink" to="/preferences" underline>
      {{t('app-header.user.settings')}}
    </BasicContextMenuItem>
    <BasicContextMenuItem @click="exitFromAccount">
      {{t('app-header.user.logout')}}
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
