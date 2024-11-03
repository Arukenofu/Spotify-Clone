import type {Track} from "@/services/types/Entities/Track";
import type {Recommendation} from "@/services/types/Recommendation";

export interface TrackInfoDossier extends Track {
}

export interface RecommendedRelatedTracks extends Track {
}

export interface PopularArtistsTracks {
    artistName: string;
    trackList: Track[];
}

export interface OtherInfo extends Recommendation {
}

export interface TrackInfo {
    trackInfoDossier: TrackInfoDossier,
    recommendedRelatedTracks: RecommendedRelatedTracks[],
    popularArtistsTracks: PopularArtistsTracks[],
    otherInfo: OtherInfo[]
}