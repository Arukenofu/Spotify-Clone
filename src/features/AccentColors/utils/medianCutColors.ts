import palette from '@jayimbee/palette'

async function medianCutColors(image: string) {
  const imgData = await palette.extractImageDataFromSrc(image, 1)

  return palette.quantize(imgData)
}

export { medianCutColors }
