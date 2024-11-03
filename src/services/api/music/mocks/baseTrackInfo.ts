import type {TrackInfo} from "@/services/api/music/types/TrackInfo";

export const baseTrackInfo = {
    trackInfoDossier: {
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
        avatar: 'https://images.genius.com/fa191dad617f50d53659774740e3bc6d.500x500x1.jpg',
        listenings: 12000,
        albumId: 1,
        color: '#333333',
        isAdded: false
    },
    recommendedRelatedTracks: [
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
    ],
    popularArtistsTracks: [
        {
            artistName: 'Moldanazar',
            trackList: [
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
        },
        {
            artistName: 'The Weeknd',
            trackList: [
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
        }
    ],
    otherInfo: [
        {
            sectionId: 1,
            naming: 'Также от исполнителя',
            list: [
                {
                    id: 1,
                    name: 'Плейлист #1',
                    imageUrl: 'https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36',
                    description: 'Плейлист #1',
                    color: '#6c2d2d',
                    type: 'Playlist'
                }
            ]
        }
    ]
} satisfies TrackInfo;