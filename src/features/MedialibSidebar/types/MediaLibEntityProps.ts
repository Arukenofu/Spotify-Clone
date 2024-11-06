export interface MediaLibEntityProps {
    id: string | number;
    name: string;
    image: string | null;
    type: 'Playlist' | 'Artist' | 'Album' | 'Folder' | 'Collection';
    isPinned: boolean;
    ownerName?: string;
    addedDateTime?: string;
    playbackDateTime?: string;
    itemsCount?: number;
}