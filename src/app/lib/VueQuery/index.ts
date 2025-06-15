import { QueryClient, VueQueryPlugin, type VueQueryPluginOptions } from '@tanstack/vue-query'

const queryClient = new QueryClient()

const VueQueryPluginConfig: VueQueryPluginOptions = {
  queryClient,
  enableDevtoolsV6Plugin: true,
  queryClientConfig: {
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
      },
    },
  },
}

export { queryClient, VueQueryPlugin, VueQueryPluginConfig }
