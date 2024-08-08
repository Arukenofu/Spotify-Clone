<script setup lang="ts">
import {ContextMenu} from '@/features/ContextMenu';



</script>

<template>
  <Suspense>
    <RouterView />
  </Suspense>

  <ContextMenu>

  </ContextMenu>
</template>

<style scoped>

</style>

