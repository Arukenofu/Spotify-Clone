import type {Music} from "@/services/types/Music";
import type {Album} from "@/services/types/Entities/Album";
import type { Recommendation } from "../api/recommendations/types/Reccomendation";

export interface DiscographyAlbum extends Album {}

export interface DiscographyPopularTracks extends Music {}

export interface DiscographyRecommended extends Recommendation {}

export interface Discography {
    albums?: DiscographyAlbum[],
    popularTracks?: DiscographyPopularTracks[],
    recommended?: DiscographyRecommended[]
}