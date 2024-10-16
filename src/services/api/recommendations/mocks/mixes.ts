import type {RecommendationMixes} from "@/services/api/recommendations/types/RecommendationMixes";

export const mixes = [
  {
    playlistId: 0,
    name: 'Микс дня #1',
    imageUrl:
      'https://cameralabs.org/media/lab18/03/02/arhiv-muzykalnyh-oblozhek_4.jpg',
    color: '#11342b',
  },
  {
    playlistId: 1,
    name: 'Микс дня #2',
    imageUrl: 'https://inde.io/uploads/1f9953e88ceae76aa8af90498bc91b90.png',
    color: '#c63b34'
  },
  {
    playlistId: 2,
    name: 'Микс дня #3',
    imageUrl:
      'https://pult.ru/upload/medialibrary/5ee/5eee4b14e41c7b041d127204557242ec.jpg',
    color: '#1077a7'
  },
  {
    playlistId: 3,
    name: 'Микс дня #4',
    imageUrl:
      'https://avatars.dzeninfra.ru/get-zen_doc/1708669/pub_5d20c72970080e00aee0b858_5d20c77091645e00ac348023/scale_1200',
    color: '#e2d840'
  }
] satisfies RecommendationMixes[];