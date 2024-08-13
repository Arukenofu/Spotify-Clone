<script setup lang="ts">
import Range from "@/shared/components/Range.vue";
import {gridColumnWidth, usePlaylistFormat} from "@/features/FormatSidebarPlaylist";

const {
  getCurrentWidth,
  setCurrentWidth,
  gridColumnMaxWidth,
  gridColumnMinWidth
} = gridColumnWidth();

const {getComponentName} = usePlaylistFormat();

</script>

<template>
  <Range
      v-if="getComponentName === 'Grid'"
      :current="getCurrentWidth"
      :min="gridColumnMinWidth"
      :max="gridColumnMaxWidth"
      @onValueChange="setCurrentWidth"
      style="margin: 9px 12px 12px"
  />
</template>

<style scoped>

</style>