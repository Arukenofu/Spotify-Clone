import {type QueryClient} from "@tanstack/vue-query";
import type {MedialibEntities, MediaLibTypes} from "@/services/api/user/medialib/types/MediaLibTypes";
import {useTippy} from "vue-tippy";
import {h} from "vue";
import EntityConfirmationModal
    from "@/widgets/LayoutSideBar/contextMenu/EntityAction/modals/EntityConfirmationModal.vue";
import apiMedialibService from "@/services/api/user/medialib/apiMedialibService";
import {addToast} from "@/widgets/Toast";

const {setContent, destroy, mount} = useTippy(() => document.body, {
    theme: 'none'
});

export default function (
    id: string | number,
    queryClient: QueryClient,
    type: MedialibEntities
) {
    mount();
    setContent(h(EntityConfirmationModal, {
        type: type,
        onClose: () => {
            destroy();
        },
        onConfirm: async () => {
            await apiMedialibService.removeMediaLibEntity(id).catch(() => {
                addToast('Неизвестная ошибка при попытке удалить медиатеку')
            });

            queryClient.setQueryData(['mediaLib'], (oldData: MediaLibTypes[]) => {
                return oldData.filter(item => item.id !== id);
            });
        }
    }));
}