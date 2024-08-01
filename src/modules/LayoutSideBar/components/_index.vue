<script setup lang="ts">
import {storeToRefs} from "pinia";
import Resizer from "@/shared/components/Resizer.vue";
import useSidebarStore from "@/modules/LayoutSideBar/store/useSidebarStore";
import Routes from "@/modules/LayoutSideBar/components/Routes.vue";
import MediaLibrary from "@/modules/LayoutSideBar/components/MediaLibrary.vue";
import max from "@/modules/LayoutSideBar/constants/max";
import min from "@/modules/LayoutSideBar/constants/min";

const store = useSidebarStore();
const {isMinimized, currentWidth} = storeToRefs(store);

function onMinimizeTooMany(newWidth: number, max: number, min: number) {
  if (newWidth < (min / 2)) {
    currentWidth.value = 72;
    isMinimized.value = true;
  } else if (newWidth >= min) {
    isMinimized.value = false;
  }
}

</script>

<template>
  <aside :style="`width: ${currentWidth}px;`">
    <Routes />
    <MediaLibrary />
  </aside>
  <Resizer
      v-model:current-width="currentWidth"
      :min-width="min"
      :max-width="max"
      @customResizeEvent="onMinimizeTooMany"
  />
</template>

<style lang="scss" scoped>
aside {
  display: flex;
  flex-direction: column;
  gap: var(--layout-gap);
}
</style>