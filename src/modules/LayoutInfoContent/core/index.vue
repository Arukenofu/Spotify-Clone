<script setup lang="ts">
import Resizer from "@/shared/components/Resizer.vue";

import max from "@/modules/LayoutInfoContent/constants/max";
import min from "@/modules/LayoutInfoContent/constants/min";
import defaultWidth from "@/modules/LayoutSideBar/constants/defaultWidth";
import useCachedRef from "@/shared/composables/useCachedRef";
import useInfoContentStore from "@/modules/LayoutInfoContent/store/useInfoContentStore";
import CurrentPlaylistQueue from "@/modules/LayoutInfoContent/components/CurrentPlaylistQueue.vue";

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