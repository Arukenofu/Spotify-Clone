import {basePlaylistInfo} from "@/services/api/music/mocks/basePlaylistInfo";
import type { PlaylistInfo } from "./types/PlaylistInfo";

export class MusicInfoService {
    async getPlaylistInfo(id: number) {
        // /music/playlistInfo/:id
        return basePlaylistInfo satisfies PlaylistInfo;
    }
}