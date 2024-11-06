import type {MediaLibTypes} from "@/services/api/user/medialib/types/MediaLibTypes";

export default [
    {
        id: 1,
        name: "My Favorite Playlist",
        image: null,
        type: "Playlist",
        isPinned: true,
        ownerName: "John Doe",
        addedDateTime: "2024-11-01T12:00:00Z",
        playbackDateTime: "2024-11-02T12:30:00Z",
    },
    {
        id: 2,
        name: "Top Artist",
        image: null,
        type: "Artist",
        isPinned: false,
        addedDateTime: "2024-10-20T15:45:00Z",
    },
    {
        id: 3,
        name: "Top Hits Album",
        image: null,
        type: "Album",
        isPinned: true,
        ownerName: "Jane Doe",
        addedDateTime: "2024-10-25T14:20:00Z",
        playbackDateTime: "2024-10-26T08:00:00Z",
    },
    {
        id: 4,
        name: "Work Folder",
        image: null,
        type: "Folder",
        isPinned: false,
        itemsCount: 5,
        addedDateTime: "2024-10-15T17:35:00Z",
    },
    {
        id: 5,
        name: "My Collection",
        image: null,
        type: "Collection",
        isPinned: true,
        itemsCount: 10,
    }
] satisfies MediaLibTypes[]