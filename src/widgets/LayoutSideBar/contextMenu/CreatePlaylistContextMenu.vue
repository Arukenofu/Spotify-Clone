<script setup lang="ts">
import type { CreatableMedialibEntities } from '@/services/api/medialib/types/CreateMedialibEntityResponse'
import type { MediaLibTypes } from '@/services/api/medialib/types/MediaLibTypes'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useI18n } from 'vue-i18n'
import { BasicContextMenuItem, BasicContextMenuView, CreatePlaylist } from '@/features/ContextMenu'
import apiMedialibService from '@/services/api/medialib/apiMedialibService'
import Folder from '@/shared/UI/Icons/FolderIcon.vue'
import { addToast } from '@/widgets/Toast'

const { t } = useI18n()

const queryClient = useQueryClient()

const { mutate: create } = useMutation({
  mutationKey: ['createPlaylist'],
  mutationFn: async (entity: CreatableMedialibEntities) => {
    const response = await apiMedialibService.createMedialibEntity(entity)

    if (response.message !== 'OK') {
      throw new Error(response.message)
    }

    queryClient.setQueryData(['mediaLib'], (oldData: MediaLibTypes[]) => {
      const newData = [...oldData]
      newData.push(response.newEntity)

      return newData
    })
  },
  onSuccess: () => {
    addToast('Добавлено в медиатеку')
  },
})
</script>

<template>
  <BasicContextMenuView>
    <CreatePlaylist @click="create('Playlist')" />
    <BasicContextMenuItem @click="create('Folder')">
      {{ t('medialib.createFolder') }}
      <template #icon>
        <Folder />
      </template>
    </BasicContextMenuItem>
  </BasicContextMenuView>
</template>

<style lang="scss" scoped></style>
