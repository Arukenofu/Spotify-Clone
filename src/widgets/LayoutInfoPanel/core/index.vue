<script setup lang="ts">
import { watch } from 'vue';
import Resizer from '@/shared/components/Resizer.vue';
import max from '@/widgets/LayoutInfoPanel/constants/max';
import min from '@/widgets/LayoutInfoPanel/constants/min';
import useCachedRef from '@/shared/composables/useCachedRef';
import {
  InfoPanelComponent,
  infoPanel,
  defaultWidth
} from '@/features/InfoPanel';

const currentPanelWidth = useCachedRef<number>(
  'infoContentWidth',
  defaultWidth,
  {
    expectedTypes: ['number'],
    min,
    max
  }
);

watch(currentPanelWidth, (value) => {
  document.documentElement.style.setProperty('--panel-width', `${value}px`);
});

const { currentPanelComponent } = infoPanel();
</script>

<template>
  <Resizer
    v-if="currentPanelComponent"
    v-model:current-width="currentPanelWidth"
    :min-width="min"
    :max-width="max"
    :from-right="true"
  />

  <aside
    v-if="currentPanelComponent"
    class="info"
    :style="`width: ${currentPanelWidth}px;`"
  >
    <InfoPanelComponent />
  </aside>
</template>

<style lang="scss" scoped>
.info {
  background-color: var(--ui);
  max-height: 100%;
  border-radius: var(--border-radius);
}
</style>
