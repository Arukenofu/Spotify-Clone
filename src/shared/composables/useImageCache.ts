const MAX_CACHE_SIZE = 200

const cache = new Set<string>()
const order: string[] = []

export function useImageCache() {
  function has(url: string) {
    return cache.has(url)
  }

  function add(url: string) {
    if (cache.has(url)) {
      order.splice(order.indexOf(url), 1)
    }
    else {
      cache.add(url)
      order.push(url)
    }

    if (order.length > MAX_CACHE_SIZE) {
      const oldest = order.shift()
      if (oldest)
        cache.delete(oldest)
    }
  }

  return { has, add }
}
