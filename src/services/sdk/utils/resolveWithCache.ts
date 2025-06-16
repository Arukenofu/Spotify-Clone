import { queryClient } from '@/app/lib/VueQuery'

async function resolveWithCache<T>(
  key: unknown[],
  fetcher: () => Promise<T>,
): Promise<T> {
  let data = queryClient.getQueryData<T>(key)

  if (!data) {
    data = await fetcher()
    queryClient.setQueryData<T>(key, data)
  }

  return data
}

export { resolveWithCache }
