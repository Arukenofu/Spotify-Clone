<script setup lang="ts">
import Resizer from "@/shared/components/Resizer.vue";

import max from "@/widgets/LayoutInfoContent/constants/max";
import min from "@/widgets/LayoutInfoContent/constants/min";
import defaultWidth from "@/widgets/LayoutSideBar/constants/defaultWidth";
import useCachedRef from "@/shared/composables/useCachedRef";
import useInfoContentStore from "@/widgets/LayoutInfoContent/store/useInfoContentStore";
import CurrentPlaylistQueue from "@/widgets/LayoutInfoContent/components/CurrentPlaylistQueue.vue";

const currentPanelWidth = useCachedRef('infoContentWidth', defaultWidth);

const {currentPanel} = useInfoContentStore()
</script>

<template>
  <Resizer
      v-if="currentPanel"
      :min-width="min"
      :max-width="max"
      v-model:current-width="currentPanelWidth"
      :from-right="true"
  />

  <aside
      v-if="currentPanel"
      class="info"
      :style="`width: ${currentPanelWidth}px;`"
  >
    <CurrentPlaylistQueue v-if="currentPanel === 'currentPlaylistQueue'" />
  </aside>
</template>

<style lang="scss" scoped>
.info {
  background-color: var(--ui);
  max-height: 100%;
  border-radius: var(--border-radius);
}
</style>