import {basePlaylistInfo} from "@/services/api/music/mocks/basePlaylistInfo";
import {baseTrackInfo} from "@/services/api/music/mocks/baseTrackInfo";
import type {TrackInfo} from "@/services/api/music/types/TrackInfo";
import type {PlaylistInfo} from "./types/PlaylistInfo";

class ApiMusicService {
    async getPlaylistInfo(id: number | string) {
        // GET /api/music/playlist/:id
        return basePlaylistInfo satisfies PlaylistInfo;
    }

    async getTrackInfo(id: number | string) {
        // GET /api/music/track/:id
        return baseTrackInfo satisfies TrackInfo;
    }
}

const musicInfoService = new ApiMusicService();
export default musicInfoService;