import type {Music} from "@/services/types/Music";
import type {SimpleUser} from "@/services/types/User";
import type {SimpleArtist} from "@/services/types/Artist";
import type {Entities} from "@/services/types/Entities";

export interface PlaylistInfoDossier {
    playlistId: number;
    name: string;
    imageUrl?: string | null;
    type: Exclude<Entities, 'User'>;
    color: string;
    description?: string | null;
    tracksAmount: number,
    tracksDuration: number,
    creator: SimpleUser | SimpleArtist
}

export interface PlaylistInfoQueue extends Music {

}

export interface PlaylistInfo {
    playlistInfoDossier: PlaylistInfoDossier,
    playlistQueue: PlaylistInfoQueue[],
}