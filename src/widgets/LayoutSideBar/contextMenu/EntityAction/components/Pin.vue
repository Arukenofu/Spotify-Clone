<script setup lang="ts">
import type { MediaLibEntityProps } from '@/features/MedialibSidebar'
import type { MediaLibTypes } from '@/services/api/medialib/types/MediaLibTypes'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useI18n } from 'vue-i18n'
import { BasicContextMenuItem } from '@/features/ContextMenu'
import apiMedialibService from '@/services/api/medialib/apiMedialibService'
import PinIcon from '@/shared/UI/Icons/PinIcon.vue'
import { addToast } from '@/widgets/Toast'

interface Props {
  id: string | number
  type: MediaLibEntityProps['type']
  isPinned: boolean
}
const { id, isPinned } = defineProps<Props>()

const { t } = useI18n()

const queryClient = useQueryClient()

const { mutate: togglePinState } = useMutation({
  mutationFn: async () => await apiMedialibService.toggleEntityPinnedState(id, isPinned),
  onSuccess: () => {
    queryClient.setQueryData(['mediaLib'], (oldData: MediaLibTypes[]) => {
      const itemIndex = oldData.findIndex(item => item.id === id)
      if (itemIndex === -1)
        return oldData

      const newData = [...oldData]
      newData[itemIndex] = {
        ...newData[itemIndex],
        isPinned: !newData[itemIndex].isPinned,
      }

      return newData
    })
  },
  onError: () => {
    addToast(t(`contextmenu-items.on${isPinned ? 'Un' : ''}PinUnSuccess`))
  },
})

function localizePinState(type: MediaLibEntityProps['type']) {
  return t(`contextmenu-items.pinItems.${type.toLowerCase()}`)
}
</script>

<template>
  <BasicContextMenuItem
    v-bind="$attrs"
    :class="isPinned && 'active-icon'"
    @click="togglePinState"
  >
    {{ `${isPinned ? t('contextmenu-items.unpin') : t('contextmenu-items.pin')} ${localizePinState(type)}` }}
    <template #icon>
      <PinIcon />
    </template>
  </BasicContextMenuItem>
</template>

<style scoped lang="scss">
</style>
