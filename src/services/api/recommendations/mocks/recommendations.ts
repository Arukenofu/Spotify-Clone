import type {Recommendation} from "@/services/types/Recommendation";

export const recommendations = [
    {
      id: 1,
      naming: 'Рекомендации',
      list: [
          {
              id: 1,
              name: 'Only for you',
              image: null,
              description: `Новые треки и редкие композиции в еженедельном миксе специально для тебя.
               Лови обновление каждый понедельник.`,
              color: null,
              type: 'Playlist',
          }
      ],
    },
    {
        id: 2,
        naming: 'Популярные исполнители',
        list: [
            {
                id: 2,
                name: 'The Weeknd',
                image: null,
                description: 'Исполнитель',
                color: null,
                type: 'Artist',
            }
        ]
    },
    {
        id: 3,
        naming: 'Вам должно понравиться',
        list: [
            {
                id: 3,
                name: 'Music',
                image: 'https://cdns-images.dzcdn.net/images/cover/7c3cdaadce2fa2683bcf059155db1036/1900x1900-000000-80-0-0.jpg',
                description: 'The greatest indie love songs of all time.',
                color: '#ff5252',
                type: 'Playlist',
            }
        ]
    }
] satisfies Recommendation[];