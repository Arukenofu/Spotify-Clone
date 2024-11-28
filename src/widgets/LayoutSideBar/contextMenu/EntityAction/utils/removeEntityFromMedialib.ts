import {type QueryClient} from "@tanstack/vue-query";
import type {MediaLibTypes} from "@/services/api/medialib/types/MediaLibTypes";
import {useTippy} from "vue-tippy";
import {h} from "vue";
import EntityConfirmationModal
    from "@/widgets/LayoutSideBar/contextMenu/EntityAction/modals/EntityConfirmationModal.vue";
import apiMedialibService from "@/services/api/medialib/apiMedialibService";
import {addToast} from "@/widgets/Toast";
import type {EntityActionContextMenuProps} from "@/widgets/LayoutSideBar/types/EntityActionContextMenuProps";

const {setContent, destroy, mount} = useTippy(() => document.body, {
    theme: 'none'
});

export default function (
    entity: EntityActionContextMenuProps,
    queryClient: QueryClient
) {
    mount();
    setContent(h(EntityConfirmationModal, {
        ...entity,
        onClose: () => {
            destroy();
        },
        onConfirm: async () => {
            await apiMedialibService.removeMediaLibEntity(entity.id).catch(() => {
                addToast('Неизвестная ошибка при попытке удалить медиатеку')
            });

            queryClient.setQueryData(['mediaLib'], (oldData: MediaLibTypes[]) => {
                return oldData.filter(item => item.id !== entity.id);
            });
        }
    }));
}