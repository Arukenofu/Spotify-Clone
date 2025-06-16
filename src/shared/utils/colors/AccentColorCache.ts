class AccentColorCacheInstance {
  private cache = new Map<string, string>()
  private maxSize = 500

  constructor() {}

  get(url: string): string | undefined {
    if (!this.cache.has(url))
      return undefined

    const value = this.cache.get(url)!
    this.cache.delete(url)
    this.cache.set(url, value)

    return value
  }

  set(url: string, color: string): void {
    if (this.cache.has(url)) {
      this.cache.delete(url)
    }

    this.cache.set(url, color)

    if (this.cache.size > this.maxSize) {
      const oldestKey = this.cache.keys().next().value
      oldestKey && this.cache.delete(oldestKey)
    }
  }

  has(url: string): boolean {
    return this.cache.has(url)
  }

  clear(): void {
    this.cache.clear()
  }

  size(): number {
    return this.cache.size
  }
}

const AccentColorCache = new AccentColorCacheInstance()

export {
  AccentColorCache,
  AccentColorCacheInstance,
}
