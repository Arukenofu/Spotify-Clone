import {getFavoriteTracksReturnData} from "@/services/api/user/mocks/getFavoriteTracksReturnData";

class ApiUserService {
    async getFavoriteTracks() {
        // GET /api/user/favoriteTracks
        return getFavoriteTracksReturnData;
    }
    async addToFavoriteTracks(id: string | number) {
        // POST /api/user/favoriteTracks
    }
    async deleteFromFavoriteTracks(id: string | number) {
        // DELETE /api/user/favoriteTracks
    }
}

const service = new ApiUserService();
export default service;