import type {Artist} from "@/services/types/Entities/Artist";

export const artistInfo = {
    id: 1,
    profile: {
        artistName: 'Moldanazar',
        avatar: '',
        coverImage: 'https://i.scdn.co/image/ab67618600001016efea59bc08c5104388f4229c',
        color: '#535353',
        description: 'Галымжан Молданазар — казахстанский певец, музыкант и солист группы Moldanazar. Родился 20 октября 1988 года в селе Караозек Кызылординской области Казахстана. Рос в среде, где культивировалась национальная культура и традиции.\nВ детстве рисовал акварелью, занимался лепкой и вокалом, играл на гитаре. В 7–8 классе начал писать стихи. В 2006 году получил аттестат об окончании школы и отправился в Алматы. Чтобы поступить на факультет эстрадного вокала, начал самостоятельно изучать музыкальную грамоту. Параллельно учился на актерском факультете Академии искусств.'
    },
    listenersQuantityPerMonth: 12300,
    subscriptionsTotalQuantity: 4900,
    cityPlaybackData: [
        {
            cityName: 'Astana',
            countryShortName: 'KZ',
            listenersQuantity: 4500
        },
        {
            cityName: 'Almaty',
            countryShortName: 'KZ',
            listenersQuantity: 3700
        },
        {
            cityName: 'Karaganda',
            countryShortName: 'KZ',
            listenersQuantity: 200
        },
    ],
    isSubscribed: false,
} satisfies Artist;