import type {MediaLibTypes} from "@/services/api/user/medialib/types/MediaLibTypes";
import routerPushPrevent from "@/shared/utils/routerPushPrevent";

export default async function handleMedialibClick(
    id: string | number,
    type: MediaLibTypes['type'],
    onFolder: Function,
) {
    if (type === 'Folder') {
        onFolder(); return;
    }
    if (type === 'Collection') {
        await routerPushPrevent(`/${type}`); return;
    }

    await routerPushPrevent(`/${type}/${id}`);
}