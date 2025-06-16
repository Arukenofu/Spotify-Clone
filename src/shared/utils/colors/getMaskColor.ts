import type { Album, PartialSearchResult, User } from '@spotify/web-api-ts-sdk'
import { getAccentColor } from '@/shared/utils/colors/getAccentColor'
import { findImage } from '../image/findImage'

export type Item = NonNullable<PartialSearchResult[keyof PartialSearchResult]>['items'][number] | User | Album

export function getMaskColor(data: Item, arrayKey: number = 2) {
  try {
    const image = findImage(data, arrayKey)
    if (!image)
      return null

    return getAccentColor(image)
  }
  catch (_) {
    return null
  }
}
