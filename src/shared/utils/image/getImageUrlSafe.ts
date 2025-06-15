import type { Image } from '@spotify/web-api-ts-sdk'

type Quality = 'low' | 'medium' | 'high'

const qualities: Record<Quality, number> = {
  low: 2,
  medium: 1,
  high: 0,
}

export function getImageUrlSafe(
  images: Image[] | { url: string }[],
  quality: number | Quality = images.length - 1,
): string | null {
  const from = typeof quality === 'string' ? qualities[quality] : quality

  const maxIndex = Math.min(from, images.length - 1)

  for (let i = maxIndex; i >= 0; i--) {
    const image = images[i]
    if (image?.url) {
      return image.url
    }
  }

  return null
}
