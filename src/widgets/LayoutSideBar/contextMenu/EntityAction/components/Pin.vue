<script setup lang="ts">
import PinIcon from "@/UI/Icons/Shared/PinIcon.vue";
import {BasicContextMenuItem} from "@/features/ContextMenu";
import type {MediaLibEntityProps} from "@/features/MedialibSidebar";
import {useMutation, useQueryClient} from "@tanstack/vue-query";
import type {MediaLibTypes} from "@/services/api/user/medialib/types/MediaLibTypes";
import apiMedialibService from "@/services/api/user/medialib/apiMedialibService";
import {addToast} from "@/widgets/Toast";

interface Props {
  id: string | number;
  type: MediaLibEntityProps['type'],
  isPinned: boolean
}
const {id, isPinned} = defineProps<Props>();

const queryClient = useQueryClient();

const {mutate: togglePinState} = useMutation({
  mutationFn: async () => await apiMedialibService.toggleEntityPinnedState(id, isPinned),
  onSuccess: () => {
    queryClient.setQueryData(['mediaLib'], (oldData: MediaLibTypes[]) => {
      const itemIndex = oldData.findIndex(item => item.id === id);
      if (itemIndex === -1) return oldData;

      const newData = [...oldData];
      newData[itemIndex] = {
        ...newData[itemIndex],
        isPinned: !newData[itemIndex].isPinned
      };

      return newData;
    });
  },
  onError: () => {
    addToast(`Не удалось открепить медиатеку`);
  }
});

function localizePinState(type: MediaLibEntityProps['type']) {
  if (type === 'Artist') {
    return 'исполнителя'
  }
  if (type === 'Folder') {
    return 'папку'
  }
  if (type === 'Playlist') {
    return 'плейлист'
  }
  if (type === 'Collection') {
    return 'плейлист'
  }
  if (type === 'Album') {
    return 'альбом'
  }
}
</script>

<template>
  <BasicContextMenuItem
    v-bind="$attrs"
    :class="isPinned && 'active-icon'"
    @click="togglePinState"
  >
    {{`${isPinned ? 'Открепить' : 'Закрепить'} ${localizePinState(type)}`}}
    <template #icon><PinIcon /></template>
  </BasicContextMenuItem>
</template>

<style scoped lang="scss">
</style>