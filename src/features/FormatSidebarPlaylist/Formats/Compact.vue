<script setup lang="ts">
import type {FormatProps} from "@/features/FormatSidebarPlaylist/types/FormatProps";

defineProps<FormatProps>();

</script>

<template>
  <RouterLink
      :to="`/playlist/${to}`"
      class="compact-playlist"
  >
    {{name}}
  </RouterLink>
</template>

<style lang="scss" scoped>
.compact-playlist {
  height: 32px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 8px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  user-select: none;
}

</style>