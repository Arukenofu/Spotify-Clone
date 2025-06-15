function proxy(image: string) {
  if (!image)
    return ''

  return `/api/proxy-image?url=${image}`
}

export { proxy }
