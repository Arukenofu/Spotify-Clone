import type {PlaylistInfo} from "@/services/api/music/types/PlaylistInfo";

export const getFavoriteTracksReturnData: PlaylistInfo = {
    playlistInfoDossier: {
        id: 0,
        name: 'Любимые треки',
        image: '',
        color: '',
        description: '',
        info: {
            uploadedDate: '2021-24-24',
            savedQuantity: 0,
            tracksAmount: 2,
            totalDuration: 820,
        },
        creators: [{
            id: 1,
            name: 'baur',
            avatar: null,
            type: 'User'
        }],
        isAdded: true,
    },
    playlistQueue: [
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
            isAddedToFavorites: false
        },
        {
            id: 2,
            name: 'Ozin Gana',
            artists: [
                {
                    id: 3,
                    name: 'Moldanazar',
                    avatar: '',
                    type: 'Artist'
                }
            ],
            duration: 420,
            uploadedDate: '12-31-2024',
            url: '/Moldanazar.mp3',
            avatar: 'https://i1.sndcdn.com/avatars-000061514491-975jfo-t1080x1080.jpg',
            listenings: 12000,
            album: {id: 1, name: 'Album Name'},
            color: '#333333',
            isAddedToFavorites: false
        }
    ]
}