<script setup lang="ts">
import { ContextMenu } from '@/features/ContextMenu';
import verifyBrowserSupport from "@/shared/utils/verifyBrowserSupport";
import NotSupports from "@/app/components/NotSupports.vue";

const {isPassed} = verifyBrowserSupport();
</script>

<template>
  <template v-if="isPassed">
    <Suspense>
      <RouterView />
    </Suspense>

    <Teleport to="body">
      <ContextMenu />
    </Teleport>
  </template>

  <NotSupports v-else />
</template>

<style lang="scss" scoped>
</style>
