import type {MediaLibTypes} from "@/services/api/user/medialib/types/MediaLibTypes";
import type {RouteLocation} from "vue-router";

export default function handleIsMedialibActive(
    id: string | number,
    type: MediaLibTypes['type'],
    route: RouteLocation
) {
    if (type === 'Collection') {
        return route.path === '/collection';
    }

    return route.path === `/${type}/${id}`.toLowerCase();
}