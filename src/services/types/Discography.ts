import type {Track} from "@/services/types/Entities/Track";
import type {Album} from "@/services/types/Entities/Album";
import type { Recommendation } from "@/services/types/Recommendation";

export interface DiscographyAlbum extends Album {}

export interface DiscographyPopularTracks extends Track {}

export interface DiscographyRecommended extends Recommendation {}

export interface Discography {
    albums: DiscographyAlbum[],
    popularTracks: DiscographyPopularTracks[],
    recommended: DiscographyRecommended[]
}