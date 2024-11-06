import mediaLib from "@/services/api/user/medialib/mocks/mediaLib";
import type {MediaLibTypes} from "@/services/api/user/medialib/types/MediaLibTypes";

class ApiMedialibService {
    async getMediaLib() {
        //  GET /api/user/medialib
        return mediaLib satisfies MediaLibTypes[];
    }
}

const service = new ApiMedialibService();
export default service;