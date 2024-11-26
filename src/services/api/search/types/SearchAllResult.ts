import type {Entities} from "@/services/types/Entities";
import type {SimpleArtist} from "@/services/types/Entities/Artist";
import type {RecommendationItem} from "@/services/types/Recommendation";
import type {SimpleTrack} from "@/services/types/Entities/Track";

interface EntityPreviewWithType<T extends Exclude<Entities, 'Track'>> extends RecommendationItem {
    type: T;
}

export interface SearchAllResult {
    bestResult: {
        id: string | number;
        title: string;
        image: string | null;
        color: string | null;
        type: Entities;
        artists?: SimpleArtist[];
    };
    bestResultTracks: SimpleTrack[];
    entities: {
        playlists: EntityPreviewWithType<'Playlist'>[];
        artists: EntityPreviewWithType<'Artist'>[];
        albums: EntityPreviewWithType<'Album'>[];
        users: EntityPreviewWithType<'User'>[];
    }
}