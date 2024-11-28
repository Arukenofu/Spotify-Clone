import type {
    CreatableMedialibEntities,
    CreateMedialibEntityResponse,
    ICreatableMedialibEntities
} from "@/services/api/medialib/types/CreateMedialibEntityResponse";

const folder: ICreatableMedialibEntities<'Folder'> = {
    id: 122,
    entityId: 122,
    name: 'New Folder',
    image: null,
    type: 'Folder',
    isPinned: false,
    itemsCount: 0,
    addedDateTime: new Date().toISOString(),
}

const playlist: ICreatableMedialibEntities<'Playlist'> = {
    id: 112,
    entityId: 112,
    name: "New Playlist",
    image: null,
    type: "Playlist",
    isPinned: false,
    owner: {
        id: 6,
        name: "Liam Brown",
        type: 'User'
    },
    addedDateTime: "2024-09-12T11:30:00Z",
    playbackDateTime: "2024-09-13T08:00:00Z",
}

export const createEntityReturnData = <T extends CreatableMedialibEntities> (
    entity: T
): CreateMedialibEntityResponse<T> => ({
    message: 'OK',
    newEntity: entity === 'Playlist'
        ? (playlist as ICreatableMedialibEntities<T>)
        : (folder as ICreatableMedialibEntities<T>)
})