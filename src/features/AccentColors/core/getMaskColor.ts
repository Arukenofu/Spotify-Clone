import type { Album, PartialSearchResult, User } from '@spotify/web-api-ts-sdk'
import { getAccentColor } from '@/features/AccentColors/core/getAccentColor.ts'
import { findImage } from '@/shared/utils/image/findImage.ts'

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
