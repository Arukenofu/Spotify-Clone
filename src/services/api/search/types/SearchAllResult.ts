import type {Entities} from "@/services/types/Entities";
import type {Artist} from "@/services/types/Entities/Artist";
import type {Music} from "@/services/types/Music";
import type {EntityPreview} from "@/services/types/Entities/EntityPreview";

interface EntityPreviewWithType<T extends Entities> extends EntityPreview {
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
    tracks: Music[];
    playlists: EntityPreviewWithType<'Playlist'>[];
    artists: EntityPreviewWithType<'Artist'>[];
    albums: EntityPreviewWithType<'Album'>[];
    users: EntityPreviewWithType<'User'>[];
}