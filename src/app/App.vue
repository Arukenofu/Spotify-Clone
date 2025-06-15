<script setup lang="ts">
import NotSupports from '@/app/components/NotSupports.vue'
import verifyBrowserSupport from '@/shared/utils/verifyBrowserSupport'

const { isPassed } = verifyBrowserSupport()
</script>

<template>
  <template v-if="isPassed">
    <Suspense>
      <RouterView />
    </Suspense>
  </template>

  <NotSupports v-else />
</template>

<style lang="scss" scoped>
</style>
