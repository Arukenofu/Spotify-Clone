<script setup lang="ts">
import useInfoContentStore from '@/features/InfoPanel/store/useInfoContentStore';
import LoadingComponent from '@/features/InfoPanel/components/LoadingComponent.vue';

const { currentPanelComponent } = useInfoContentStore();
</script>

<template>
  <Suspense>
    <template #fallback>
      <LoadingComponent />
    </template>
    <template #default>
      <Component :is="currentPanelComponent" />
    </template>
  </Suspense>
</template>

<style scoped></style>
