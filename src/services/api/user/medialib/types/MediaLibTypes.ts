import type {Entities} from "@/services/types/Entities";

export type MedialibEntities = Exclude<Entities, 'User' | 'Track'> | 'Folder' | 'Collection';

interface MediaLibBase<T extends MedialibEntities> {
  id: string | number;
  entityId: string | number;
  name: string;
  image: string | null;
  type: T;
  isPinned: boolean;
}

interface Playlist extends MediaLibBase<'Playlist'>{
  ownerName: string;
  addedDateTime: string;
  playbackDateTime: string;
}

interface Artist extends MediaLibBase<'Artist'>{
  addedDateTime: string;
}

interface Album extends MediaLibBase<'Album'>{
  ownerName: string;
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
