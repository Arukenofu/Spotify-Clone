import type {SimpleArtist} from "@/services/types/Entities/Artist";

export interface Album {
    id: number | string;
    name: string;
    image: string | null;
    color: string | null;
    description: string | null;
    info: {
        uploadedDate: string;
        savedQuantity: number;
        tracksAmount: number;
        totalDuration: number;
    };
    creators: SimpleArtist[];
    isAdded: boolean;
}