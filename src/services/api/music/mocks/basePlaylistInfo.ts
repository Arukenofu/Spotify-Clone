import type {PlaylistInfo} from "@/services/api/music/types/PlaylistInfo";

export const basePlaylistInfo = {
    playlistInfoDossier: {
        id: 0,
        name: 'Базовая коллекция',
        image: null,
        color: 'rgb(240, 64, 112)',
        description: 'asd',
        info: {
            uploadedDate: '2021-24-24',
            savedQuantity: 123000,
            tracksAmount: 2,
            totalDuration: 820,
        },
        creators: [{
            id: 1,
            name: 'baur',
            avatar: null,
            type: 'User'
        },{
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
            albumId: 1,
            color: '#333333',
            isAdded: false
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
            albumId: 1,
            color: '#333333',
            isAdded: false
        }
    ]
} satisfies PlaylistInfo