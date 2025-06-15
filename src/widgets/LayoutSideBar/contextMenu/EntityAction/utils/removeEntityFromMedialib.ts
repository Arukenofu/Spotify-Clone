import type { QueryClient } from '@tanstack/vue-query'
import type { MediaLibTypes } from '@/services/api/medialib/types/MediaLibTypes'
import type { EntityActionContextMenuProps } from '@/widgets/LayoutSideBar/types/EntityActionContextMenuProps'
import { h } from 'vue'
import { useTippy } from 'vue-tippy'
import apiMedialibService from '@/services/api/medialib/apiMedialibService'
import EntityConfirmationModal
  from '@/widgets/LayoutSideBar/contextMenu/EntityAction/modals/EntityConfirmationModal.vue'
import { addToast } from '@/widgets/Toast'

const { setContent, destroy, mount } = useTippy(() => document.body, {
  theme: 'none',
})

export default function (
  entity: EntityActionContextMenuProps,
  queryClient: QueryClient,
) {
  mount()
  setContent(h(EntityConfirmationModal, {
    ...entity,
    onClose: () => {
      destroy()
    },
    onConfirm: async () => {
      await apiMedialibService.removeMediaLibEntity(entity.id).catch(() => {
        addToast('Неизвестная ошибка при попытке удалить медиатеку')
      })

      queryClient.setQueryData(['mediaLib'], (oldData: MediaLibTypes[]) => {
        return oldData.filter(item => item.id !== entity.id)
      })
    },
  }))
}
