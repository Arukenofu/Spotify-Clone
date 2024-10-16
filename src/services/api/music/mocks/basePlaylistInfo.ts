import type {PlaylistInfo} from "@/services/api/music/types/PlaylistInfo";

export const basePlaylistInfo = {
    playlistInfoDossier: {
        playlistId: 0,
        name: 'Базовая коллекция',
        imageUrl: null,
        type: 'Playlist',
        color: 'rgb(240, 64, 112)',
        description: 'asd',
        tracksAmount: 2,
        tracksDuration: 820,
        creator: {
            id: 1,
            name: 'baur',
            avatar: null
        }
    },
    playlistQueue: [
        {
            id: 1,
            name: 'Мосты',
            artists: [
                {
                    id: 1,
                    name: 'Rauf',
                    avatar: ''
                },
                {
                    id: 2,
                    name: 'Faik',
                    avatar: ''
                }
            ],
            duration: 420,
            uploadedDate: '12-31-2024',
            url: '/Мосты.mp3',
            avatar:
                'https://images.genius.com/fa191dad617f50d53659774740e3bc6d.500x500x1.jpg'
        },
        {
            id: 2,
            name: 'Ozin Gana',
            artists: [
                {
                    id: 3,
                    name: 'Moldanazar',
                    avatar: ''
                }
            ],
            duration: 420,
            uploadedDate: '12-31-2024',
            url: '/Moldanazar.mp3',
            avatar: 'https://i1.sndcdn.com/avatars-000061514491-975jfo-t1080x1080.jpg'
        }
    ]
} satisfies PlaylistInfo