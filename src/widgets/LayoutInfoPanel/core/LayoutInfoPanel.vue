<script setup lang="ts">
import { infoPanel, maxInfoPanelWidth, minInfoPanelWidth, useInfoPanelWidth } from '@/features/InfoPanel'
import Resizer from '@/shared/components/Resizer.vue'
import LoadingComponent from '@/widgets/LayoutInfoPanel/components/LoadingComponent.vue'

const { currentPanelComponent } = infoPanel()
const { currentPanelWidth } = useInfoPanelWidth()
</script>

<template>
  <Resizer
    v-if="currentPanelComponent"
    v-model:current-width="currentPanelWidth"
    :min-width="minInfoPanelWidth"
    :max-width="maxInfoPanelWidth"
    :from-right="true"
  />

  <aside
    v-if="currentPanelComponent"
    class="info"
  >
    <Suspense>
      <template #fallback>
        <LoadingComponent />
      </template>
      <template #default>
        <Component :is="currentPanelComponent" />
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
