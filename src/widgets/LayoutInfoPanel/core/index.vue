<script setup lang="ts">
import {watch} from "vue";
import Resizer from "@/shared/components/Resizer.vue";
import max from "@/widgets/LayoutInfoPanel/constants/max";
import min from "@/widgets/LayoutInfoPanel/constants/min";
import useCachedRef from "@/shared/composables/useCachedRef";
import {infoPanel, defaultWidth} from "@/features/InfoPanel";

const currentPanelWidth = useCachedRef('infoContentWidth', defaultWidth);

watch(currentPanelWidth, (value) => {
  setPanelStyleWidth(value);
})

const {currentPanelComponent, setPanelStyleWidth} = infoPanel();

</script>

<template>
  <Resizer
      v-if="currentPanelComponent"
      :min-width="min"
      :max-width="max"
      v-model:current-width="currentPanelWidth"
      :from-right="true"
  />

  <aside
      v-if="currentPanelComponent"
      class="info"
      :style="`width: ${currentPanelWidth}px;`"
  >
    <Component :is="currentPanelComponent" />
  </aside>
</template>

<style lang="scss" scoped>
.info {
  background-color: var(--ui);
  max-height: 100%;
  border-radius: var(--border-radius);
}
</style>