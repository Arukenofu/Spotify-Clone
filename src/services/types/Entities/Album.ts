import type {SimpleArtist} from "@/services/types/Entities/Artist";

export interface Album {
    id: number | string;
    name: string;
    image: string;
    color?: string | null;
    info: {
        uploadedDate: string;
        savedQuantity: number;
        tracksAmount: number;
        totalDuration: number;
    };
    creators: SimpleArtist[]
}