import type {Entities} from "@/services/types/Entities";
import type {Track} from "@/services/types/Entities/Track";
import type {RecommendationItem} from "@/services/types/Recommendation";

const playlists: RecommendationItem[] = [
    {
        id: 3,
        name: 'Music',
        image: 'https://cdns-images.dzcdn.net/images/cover/7c3cdaadce2fa2683bcf059155db1036/1900x1900-000000-80-0-0.jpg',
        description: 'The greatest indie love songs of all time.',
        color: '#ff5252',
        type: 'Playlist',
    }
];

const profiles: RecommendationItem[] = [

];

const tracks: Track[] = [
    {
        id: 1,
        name: 'Мосты',
        artists: [
            {
                id: 1,
                name: 'Rauf',
                avatar: '',
                type: 'Artist'
            },
            {
                id: 2,
                name: 'Faik',
                avatar: '',
                type: 'Artist'
            }
        ],
        duration: 420,
        uploadedDate: '12-31-2024',
        url: '/Мосты.mp3',
        avatar:
            'https://images.genius.com/fa191dad617f50d53659774740e3bc6d.500x500x1.jpg',
        listenings: 12000,
        album: {id: 1, name: 'Album Name'},
        color: '#333333',
        isAddedToFavorites: false,
    }
];

const albums: RecommendationItem[] = [

];

const artists: RecommendationItem[] = [

];

export default function searchEntityResult<T extends Entities>(
    type: T
): Track[] | RecommendationItem[] {
    if (type === 'Track') {
        return tracks;
    }
    if (type === 'User') {
        return profiles;
    }
    if (type === 'Album') {
        return albums;
    }
    if (type === 'Artist') {
        return artists;
    }
    if (type === 'Playlist') {
        return playlists;
    }

    return [];
}