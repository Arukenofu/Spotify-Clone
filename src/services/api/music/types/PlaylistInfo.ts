import type {Track} from "@/services/types/Entities/Track";
import type {Playlist} from "@/services/types/Entities/Playlist";

export interface PlaylistInfo {
    playlistInfoDossier: Playlist,
    playlistQueue: Track[],
}