export interface SimpleArtist {
  id: number | string
  name: string
  avatar?: string | null
  type: 'Artist'
}

export interface Artist {
  id: number | string
  profile: {
    artistName: string
    avatar: string | null
    coverImage: string | null
    color: string
    description: string | null
  }
  listenersQuantityPerMonth: number
  subscriptionsTotalQuantity: number
  cityPlaybackData: {
    cityName: string
    countryShortName: string
    listenersQuantity: number
  }[]
  isSubscribed: boolean
}
