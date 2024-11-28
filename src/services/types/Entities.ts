import type {Playlist} from "@/services/types/Entities/Playlist";
import type {Artist} from "@/services/types/Entities/Artist";
import type {Album} from "@/services/types/Entities/Album";
import type {Track} from "@/services/types/Entities/Track";
import type {SimpleUser} from "@/services/types/Entities/User";

export type Entities = 'Playlist' | 'User' | 'Artist' | 'Album' | 'Track';

export type IEntities<T extends Entities> =
    T extends 'Playlist' ? Playlist :
    T extends 'Artist' ? Artist :
    T extends 'Album' ? Album :
    T extends 'Track' ? Track :
    T extends 'User' ? SimpleUser :
    never;