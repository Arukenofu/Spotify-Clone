<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import getCountryCodeA2 from '@/app/lib/i18n/utils/getCountryCodeA2'
import getLocale from '@/app/lib/i18n/utils/getLocale'
import { sdk } from '@/services/sdk'

const route = useRoute('/genre/[id]')

const genreId = computed(() => route.params.id)

const { data } = useQuery({
  queryKey: ['genre', genreId],
  queryFn: async () => {
    return sdk.browse.getCategory(genreId.value, getCountryCodeA2(), getLocale())
  },
  staleTime: Infinity,
})
</script>

<template>
  <pre v-if="data">{{ data }}</pre>
</template>

<style lang="scss" scoped>

</style>
