import type { Music } from '@/shared/models/Music';

export default [
  {
    id: 1,
    name: 'Мосты',
    artists: [
      {
        id: 1,
        name: 'Rauf',
        url: 'rauf'
      },
      {
        id: 2,
        name: 'Faik',
        url: 'faik'
      }
    ],
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
        url: 'moldanazar'
      }
    ],
    url: '/Moldanazar.mp3',
    avatar: 'https://i1.sndcdn.com/avatars-000061514491-975jfo-t1080x1080.jpg'
  }
] satisfies Music[];
