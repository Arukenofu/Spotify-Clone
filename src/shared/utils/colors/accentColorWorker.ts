import { AccentColorCache } from '@/shared/utils/colors/AccentColorCache.ts'
import AccentColorWorker from './__accentColorWorker.ts?worker'

let worker: Worker | null = null
let handlers: ((value: string) => void)[] = []

function initWorker() {
  if (!worker) {
    worker = new AccentColorWorker()

    worker.onmessage = (e) => {
      const result = e.data
      const handler = handlers.shift()
      handler?.(result)
    }
  }
}

export function accentColorWorker(url: string): Promise<string> | string {
  if (AccentColorCache.has(url))
    return AccentColorCache.get(url)!

  initWorker()

  return new Promise<string>((resolve) => {
    handlers.push((color) => {
      AccentColorCache.set(url, color)
      resolve(color)
    })
    worker!.postMessage(url)
  })
}

export function destroyAccentWorker() {
  worker?.terminate()
  worker = null
  handlers = []
}
