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

export interface MedialibPlaylist extends MediaLibBase<'Playlist'>{
  owner: SimpleUser;
  addedDateTime: string;
  playbackDateTime: string;
}

export interface MedialibArtist extends MediaLibBase<'Artist'>{
  addedDateTime: string;
}

export interface MedialibAlbum extends MediaLibBase<'Album'>{
  owner: SimpleUser;
  addedDateTime: string;
  playbackDateTime: string;
}

export interface MedialibFolder extends MediaLibBase<'Folder'>{
  itemsCount: number;
  addedDateTime: string;
}

export interface MedialibCollection extends MediaLibBase<'Collection'>{
  itemsCount: number;
}

export type MediaLibTypes = MedialibPlaylist | MedialibArtist | MedialibAlbum | MedialibFolder | MedialibCollection;
