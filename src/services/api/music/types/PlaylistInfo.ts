import type {Track} from "@/services/types/Entities/Track";
import type {Playlist} from "@/services/types/Entities/Playlist";

export interface PlaylistInfoDossier extends Playlist {
}

export interface PlaylistInfoQueue extends Track {
}

export interface PlaylistInfo {
    playlistInfoDossier: PlaylistInfoDossier,
    playlistQueue: PlaylistInfoQueue[],
}