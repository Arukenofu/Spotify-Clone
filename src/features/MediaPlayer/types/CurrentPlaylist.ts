import type {Playlist} from "@/shared/models/Playlist";

export interface CurrentPlaylist extends Omit<Playlist, 'name'> {
    name: string | null,
}