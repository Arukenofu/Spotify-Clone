import type {Entities} from "@/services/types/Entities";
import type {SimpleUser} from "@/services/types/Entities/User";

export type MedialibEntities = Exclude<Entities, 'User' | 'Track'> | 'Folder' | 'Collection';

export interface MediaLibBase<T extends MedialibEntities> {
  id: string | number;
  entityId: string | number;
  name: string;
  image: string | null;
  type: T;
  isPinned: boolean;
}


interface Playlist extends MediaLibBase<'Playlist'>{
  owner: SimpleUser;
  addedDateTime: string;
  playbackDateTime: string;
}

interface Artist extends MediaLibBase<'Artist'>{
  addedDateTime: string;
}

interface Album extends MediaLibBase<'Album'>{
  owner: SimpleUser;
  addedDateTime: string;
  playbackDateTime: string;
}

interface Folder extends MediaLibBase<'Folder'>{
  itemsCount: number;
  addedDateTime: string;
}

interface Collection extends MediaLibBase<'Collection'>{
  itemsCount: number;
}

export type MediaLibTypes = Playlist | Artist | Album | Folder | Collection;
