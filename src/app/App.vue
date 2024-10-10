<script setup lang="ts">
import { ContextMenu } from '@/features/ContextMenu';
</script>

<template>
  <Suspense>
    <RouterView />
  </Suspense>

  <Teleport to="body">
    <ContextMenu />
  </Teleport>
</template>

<style lang="scss" scoped>
</style>
