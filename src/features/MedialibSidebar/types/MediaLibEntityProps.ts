import type {MediaLibBase} from "@/services/api/medialib/types/MediaLibTypes";
import type {SimpleUser} from "@/services/types/Entities/User";

export interface MediaLibEntityProps extends MediaLibBase<'Playlist' | 'Artist' | 'Album' | 'Folder' | 'Collection'> {
    owner?: SimpleUser;
    addedDateTime?: string;
    playbackDateTime?: string;
    itemsCount?: number;
}