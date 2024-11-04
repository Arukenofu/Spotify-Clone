<script setup lang="ts">
import { Dropdown } from 'floating-vue'
import RoundButton from '@/UI/Buttons/RoundButton.vue';
import UserProfileMenu from "@/widgets/LayoutHeader/contextmenu/UserProfileMenu.vue";

</script>

<template>
  <Dropdown :distance="7">
    <RoundButton
      v-tooltip="{
        content: 'Бауыржан Алкенов',
        distance: 5
      }"
      v-disable-child
      class="user-avatar"
    >
      <div
        class="picture"
        :class="'no-picture'"
        data-char="Б"
      />
    </RoundButton>

    <template #popper>
      <UserProfileMenu />
    </template>
  </Dropdown>
</template>

<style lang="scss" scoped>
.user-avatar {
  height: 48px;
  width: 48px;
  min-width: 48px;
  background-color: var(--ui-highlight);
  display: grid;
  place-items: center;

  &:hover {
    scale: 1.02;

    .picture {
      scale: 1.02;
    }
  }

  .picture {
    height: 32px;
    width: 32px;
    background-color: var(--main-color);
    border-radius: 50%;
    position: relative;
  }

  .no-picture::after {
    content: attr(data-char);
    font-weight: 600;
    color: var(--black);
    line-height: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
