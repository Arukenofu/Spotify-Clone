import type {Recommendation} from "@/services/api/recommendations/types/Reccomendation";

export const recommendations = [
    {
      sectionId: 1,
      naming: null,
      type: 'Playlist',
      list: [
          {
              playlistId: 1,
              name: 'Only for you',
              imageUrl: null,
              description: `Новые треки и редкие композиции в еженедельном миксе специально для тебя.
               Лови обновление каждый понедельник.`,
              color: null
          }
      ],
    },
    {
        sectionId: 2,
        naming: 'Популярные исполнители',
        type: 'Artist',
        list: [
            {
                playlistId: 2,
                name: 'The Weeknd',
                imageUrl: null,
                description: 'Исполитель',
                color: null
            }
        ]
    },
    {
        sectionId: 3,
        naming: 'Вам должно понравиться',
        type: 'Playlist',
        list: [
            {
                playlistId: 3,
                name: 'Music',
                imageUrl: 'https://cdns-images.dzcdn.net/images/cover/7c3cdaadce2fa2683bcf059155db1036/1900x1900-000000-80-0-0.jpg',
                description: 'The greatest indie love songs of all time.',
                color: '#ff5252'
            }
        ]
    }
] satisfies Recommendation[];