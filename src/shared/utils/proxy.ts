function proxy(image: string) {
  return `/api/proxy-image?url=${image}`
}

export { proxy }
