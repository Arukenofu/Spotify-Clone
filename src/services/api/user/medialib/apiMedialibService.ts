import mediaLib from "@/services/api/user/medialib/mocks/mediaLib";
import type {MediaLibTypes} from "@/services/api/user/medialib/types/MediaLibTypes";
import api from "@/services/api";

class ApiMedialibService {
    async getMediaLib() {
        //  GET /api/user/medialib
        return mediaLib satisfies MediaLibTypes[];
    }
    async toggleEntityPinnedState(id: number | string, currentState: boolean) {
        const route = currentState ? 'unpin' : 'pin';

        return api(`/api/user/medialib/${id}/${route}`, {
            method: "POST"
        });
    }
}

const service = new ApiMedialibService();
export default service;