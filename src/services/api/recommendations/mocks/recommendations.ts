import type {Recommendation} from "@/services/api/recommendations/types/Reccomendation";

export const recommendations = [
    {
      sectionId: 1,
      naming: null,
      list: [
          {
              id: 1,
              name: 'Only for you',
              imageUrl: null,
              description: `Новые треки и редкие композиции в еженедельном миксе специально для тебя.
               Лови обновление каждый понедельник.`,
              color: null,
              type: 'Playlist',
          }
      ],
    },
    {
        sectionId: 2,
        naming: 'Популярные исполнители',
        list: [
            {
                id: 2,
                name: 'The Weeknd',
                imageUrl: null,
                description: 'Исполитель',
                color: null,
                type: 'Artist',
            }
        ]
    },
    {
        sectionId: 3,
        naming: 'Вам должно понравиться',
        list: [
            {
                id: 3,
                name: 'Music',
                imageUrl: 'https://cdns-images.dzcdn.net/images/cover/7c3cdaadce2fa2683bcf059155db1036/1900x1900-000000-80-0-0.jpg',
                description: 'The greatest indie love songs of all time.',
                color: '#ff5252',
                type: 'Playlist',
            }
        ]
    }
] satisfies Recommendation[];