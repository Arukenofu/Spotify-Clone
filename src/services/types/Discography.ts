import type {Music} from "@/services/types/Entities/Music";

export interface DiscographyAlbum {
    albumId: number;
    name: string;
    imageUrl: string | null;
    description: string | null;
    color: string | null;
}

export interface DiscographyPopularTracks extends Music {

}

export interface DiscographyLatestTracks extends Music {

}

export interface Discography {
    albums?: DiscographyAlbum[],
    popularTracks?: DiscographyPopularTracks[],
    latestTracks?: DiscographyLatestTracks[]
}