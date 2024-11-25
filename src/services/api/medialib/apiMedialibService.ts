import mediaLib from "@/services/api/medialib/mocks/mediaLib";
import type {MediaLibTypes} from "@/services/api/medialib/types/MediaLibTypes";
import api from "@/services/api";
import type {ResponseOK} from "@/services/types/Responses/ResponseOK";

class ApiMedialibService {
    async getMediaLib() {
        //  GET /api/user/medialib
        return mediaLib satisfies MediaLibTypes[];
    }

    async removeMediaLibEntity(id: number | string) {
        return api<ResponseOK>(`/api/user/medialib/mediaLib/remove/${id}`, {
            method: "DELETE"
        });
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