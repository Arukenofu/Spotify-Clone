import {basePlaylistInfo} from "@/services/api/music/mocks/basePlaylistInfo";
import {baseTrackInfo} from "@/services/api/music/mocks/baseTrackInfo";
import type {TrackInfo} from "@/services/api/music/types/TrackInfo";
import type {PlaylistInfo} from "./types/PlaylistInfo";

export class MusicInfoService {
    async getPlaylistInfo(id: number) {
        // GET /api/music/playlist/:id
        return basePlaylistInfo satisfies PlaylistInfo;
    }

    async getTrackInfo(id: number) {
        // GET /api/music/track/:id
        return baseTrackInfo satisfies TrackInfo;
    }
}