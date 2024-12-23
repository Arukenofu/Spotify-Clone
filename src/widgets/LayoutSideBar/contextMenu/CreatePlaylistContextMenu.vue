<script setup lang="ts">
import Folder from '@/UI/Icons/Shared/FolderIcon.vue';
import {BasicContextMenuItem, BasicContextMenuView, CreatePlaylist} from "@/features/ContextMenu";
import {useMutation, useQueryClient} from "@tanstack/vue-query";
import apiMedialibService from "@/services/api/medialib/apiMedialibService";
import type {MediaLibTypes} from "@/services/api/medialib/types/MediaLibTypes";
import type {CreatableMedialibEntities} from "@/services/api/medialib/types/CreateMedialibEntityResponse";
import {addToast} from "@/widgets/Toast";
import {useI18n} from "vue-i18n";

const {t} = useI18n();

const queryClient = useQueryClient();

const {mutate: create} = useMutation({
  mutationKey: ['createPlaylist'],
  mutationFn: async (entity: CreatableMedialibEntities) => {
    const response = await apiMedialibService.createMedialibEntity(entity);

    if (response.message !== 'OK') {
      throw new Error(response.message);
    }

    queryClient.setQueryData(['mediaLib'], (oldData: MediaLibTypes[]) => {
      const newData = [...oldData];
      newData.push(response.newEntity)

      return newData;
    })
  },
  onSuccess: () => {
    addToast('Добавлено в медиатеку');
  }
});

</script>

<template>
  <BasicContextMenuView>
    <CreatePlaylist @click="create('Playlist')" />
    <BasicContextMenuItem @click="create('Folder')">
      {{t('medialib.createFolder')}}
      <template #icon>
        <Folder />
      </template>
    </BasicContextMenuItem>
  </BasicContextMenuView>
</template>

<style lang="scss" scoped></style>
