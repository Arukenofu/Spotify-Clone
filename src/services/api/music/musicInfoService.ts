import {basePlaylistInfo} from "@/services/api/music/mocks/basePlaylistInfo";

export class MusicInfoService {
    async getPlaylistInfo(id: number) {
        // /music/playlistInfo/:id
        return basePlaylistInfo;
    }
}