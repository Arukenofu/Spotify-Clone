import type {Music} from "@/services/types/Music";
import type {Playlist} from "@/services/types/Entities/Playlist";

export interface PlaylistInfoDossier extends Playlist {
    isAdded: boolean;
}

export interface PlaylistInfoQueue extends Music {
}

export interface PlaylistInfo {
    playlistInfoDossier: PlaylistInfoDossier,
    playlistQueue: PlaylistInfoQueue[],
}