import type {Artist} from "@/shared/models/Artist";

interface SimpleArtist extends Pick<Artist, 'id' | 'name' | 'url'> {}

export interface Music {
    id: number,
    name: string,
    artists: SimpleArtist[],
    avatar: string,
    url: string,
}

