import type {SimpleArtist} from "@/services/types/Entities/Artist";

export interface Album {
    id: number;
    name: string;
    image: string;
    color?: string | null;
    info: {
        year: number;
        musicQuantity: number;
        tracksAmount: number;
        totalDuration: number;
    };
    creators: SimpleArtist[]
}