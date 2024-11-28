import type {ResponseOK} from "@/services/types/Responses/ResponseOK";
import type {MedialibFolder, MedialibPlaylist} from "@/services/api/medialib/types/MediaLibTypes";

export type CreatableMedialibEntities = 'Playlist' | 'Folder';
export type ICreatableMedialibEntities<T extends CreatableMedialibEntities> =
    T extends 'Playlist' ? MedialibPlaylist :
    T extends 'Folder' ? MedialibFolder :
    never;

export interface CreateMedialibEntityResponse<T extends CreatableMedialibEntities> extends ResponseOK {
    newEntity: ICreatableMedialibEntities<T>
}