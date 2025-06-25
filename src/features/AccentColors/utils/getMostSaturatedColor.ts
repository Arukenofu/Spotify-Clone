import { rgbToHsl } from '@/shared/utils/colors/rgbToHsl.ts'

interface RGBA {
  r: number
  g: number
  b: number
  a?: number
}

function getMostSaturatedColor(colors: RGBA[]): RGBA {
  let maxSaturation = -1
  let mostSaturated = colors[0]

  colors.forEach((color) => {
    const [, saturation, lightness] = rgbToHsl(color.r, color.g, color.b)

    if (lightness < 0.1)
      return

    if (saturation > maxSaturation) {
      maxSaturation = saturation
      mostSaturated = color
    }
  })

  return mostSaturated
}

export { getMostSaturatedColor }
