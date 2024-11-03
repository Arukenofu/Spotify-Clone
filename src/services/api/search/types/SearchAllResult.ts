import type {Entities} from "@/services/types/Entities";
import type {Artist} from "@/services/types/Entities/Artist";
import type {Track} from "@/services/types/Entities/Track";
import type {RecommendationItem} from "@/services/types/Recommendation";

interface EntityPreviewWithType<T extends Entities> extends RecommendationItem {
    type: T;
}

export interface SearchAllResult {
    bestResult: {
        id: string | number;
        title: string;
        image: string | null;
        color: string | null;
        type: Entities;
        artists?: Artist[];
    };
    tracks: Track[];
    playlists: EntityPreviewWithType<'Playlist'>[];
    artists: EntityPreviewWithType<'Artist'>[];
    albums: EntityPreviewWithType<'Album'>[];
    users: EntityPreviewWithType<'User'>[];
}