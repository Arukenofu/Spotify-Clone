<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'
import { ContextMenu } from '@/features/ContextMenu'
import { sdk } from '@/services/sdk'
import RoundButton from '@/shared/UI/Buttons/RoundButton.vue'
import UserProfileMenu from '@/widgets/LayoutHeader/contextmenu/UserProfileMenu.vue'

const { data: currentUser } = useQuery({
  queryKey: ['currentUser'],
  queryFn: async () => {
    return sdk.currentUser.profile()
  },
  staleTime: Infinity,
})

const isHasAvatar = computed(() => !!currentUser.value!.images.length)
</script>

<template>
  <ContextMenu v-if="currentUser" trigger="click" :offset="[0, 7]">
    <RoundButton
      v-tooltip="currentUser?.display_name"
      v-disable-child
      class="user-avatar"
    >
      <div
        class="picture"
        :class="!isHasAvatar && 'no-picture'"
        :style="isHasAvatar && `background-image: url('${currentUser.images[1].url}')`"
        :data-char="currentUser?.display_name[0]"
      />
    </RoundButton>

    <template #menu>
      <UserProfileMenu :userid="currentUser.id" />
    </template>
  </ContextMenu>
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
    border-radius: 50%;
    position: relative;
    background-position: center;
    background-size: cover;
  }

  .no-picture {
    background-color: rgb(180, 155, 200);;

    &::after {
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
}
</style>
