import { AccentColorCache } from '@/features/AccentColors/cache'
import { getMostSaturatedColor } from '@/features/AccentColors/utils/getMostSaturatedColor.ts'
import { medianCutColors } from '@/features/AccentColors/utils/medianCutColors.ts'

async function getAccentColor(url: string) {
  if (!url)
    return null
  if (AccentColorCache.has(url))
    return AccentColorCache.get(url)!

  const colors = await medianCutColors(url)
  const { r, g, b } = getMostSaturatedColor(colors)

  return `rgb(${r}, ${g}, ${b})`
}

export { getAccentColor }
