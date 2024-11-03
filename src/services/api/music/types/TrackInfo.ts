import type {Music} from "@/services/types/Music";
import type {Recommendation} from "@/services/api/recommendations/types/Reccomendation";

export interface TrackInfoDossier extends Music {
}

export interface RecommendedRelatedTracks extends Music {
}

export interface PopularArtistsTracks {
    artistName: string;
    trackList: Music[];
}

export interface OtherInfo extends Recommendation {
}

export interface TrackInfo {
    trackInfoDossier: TrackInfoDossier,
    recommendedRelatedTracks: RecommendedRelatedTracks[],
    popularArtistsTracks: PopularArtistsTracks[],
    otherInfo: OtherInfo[]
}