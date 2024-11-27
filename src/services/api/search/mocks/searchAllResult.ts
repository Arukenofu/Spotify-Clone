import type {SearchAllResult} from "@/services/api/search/types/SearchAllResult";

export default {
    bestResult: {
        id: 1,
        title: 'No more what ifs',
        image: 'https://m.media-amazon.com/images/I/91VDetfVuOL._UF894,1000_QL80_.jpg',
        color: '#e73d3d',
        type: 'Track',
        artists: [{
            id: 1,
            name: 'ATLUS',
            type: 'Artist'
        }],
    },
    bestResultTracks: [
        {
            id: 1,
            name: 'track 1',
            image: null,
            color: null,
            artists: [{
                id: 1,
                name: 'artist',
                type: 'Artist'
            }],
            isAddedToFavorites: false,
            duration: 123,
        },
        {
            id: 1,
            name: 'track 1',
            image: null,
            color: null,
            artists: [{
                id: 1,
                name: 'artist',
                type: 'Artist'
            }],
            isAddedToFavorites: false,
            duration: 123,
        },
        {
            id: 1,
            name: 'track 1',
            image: null,
            color: null,
            artists: [{
                id: 1,
                name: 'artist',
                type: 'Artist'
            }],
            isAddedToFavorites: false,
            duration: 123,
        },
        {
            id: 1,
            name: 'track 1',
            image: null,
            color: null,
            artists: [{
                id: 1,
                name: 'artist',
                type: 'Artist'
            }],
            isAddedToFavorites: false,
            duration: 123,
        },
    ],
    entities: {
        playlists: [
            {
                id: 3,
                name: 'Music',
                image: 'https://cdns-images.dzcdn.net/images/cover/7c3cdaadce2fa2683bcf059155db1036/1900x1900-000000-80-0-0.jpg',
                description: 'The greatest indie love songs of all time.',
                color: '#ff5252',
                type: 'Playlist',
            }
        ],
        artists: [
            {
                id: 2,
                name: 'The Weeknd',
                image: null,
                description: 'Исполнитель',
                color: null,
                type: 'Artist',
            }
        ],
        albums: [
            {
                id: 3,
                name: 'Music',
                image: 'https://cdns-images.dzcdn.net/images/cover/7c3cdaadce2fa2683bcf059155db1036/1900x1900-000000-80-0-0.jpg',
                description: 'The greatest indie love songs of all time.',
                color: '#ff5252',
                type: 'Album',
            }
        ],
        users: [
            {
                id: 2,
                name: 'John Doe',
                image: null,
                description: 'User description',
                color: null,
                type: 'User',
            }
        ],
    }
} satisfies SearchAllResult;