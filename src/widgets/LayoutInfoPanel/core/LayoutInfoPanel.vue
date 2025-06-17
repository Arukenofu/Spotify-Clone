<script setup lang="ts">
import { maxWidth, minWidth, useInfoPanel, useInfoPanelWidth } from '@/features/InfoPanel'
import Resizer from '@/shared/components/Resizer.vue'
import LoadingComponent from '@/widgets/LayoutInfoPanel/components/LoadingComponent.vue'

const { Component: InfoPanelComponent } = useInfoPanel()
const { currentPanelWidth } = useInfoPanelWidth()
</script>

<template>
  <Resizer
    v-if="InfoPanelComponent"
    v-model:current-width="currentPanelWidth"
    :min-width="minWidth"
    :max-width="maxWidth"
    :from-right="true"
  />

  <aside
    v-if="InfoPanelComponent"
    class="info"
  >
    <Suspense>
      <template #fallback>
        <LoadingComponent />
      </template>
      <template #default>
        <Component :is="InfoPanelComponent" />
      </template>
    </Suspense>
  </aside>
</template>

<style lang="scss" scoped>
.info {
  background-color: var(--ui);
  max-height: 100%;
  border-radius: var(--border-radius);
  width: var(--panel-width-px);
}
</style>
