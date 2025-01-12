<script setup lang="ts">
import {computed} from "vue";

interface Props {
  minColumnWidth: string;
  minRows?: number | 'auto';
}
const {minRows = 'auto'} = defineProps<Props>();

const computeGridAutoRows = computed(() => {
  if (minRows === 'auto') {
    return 'auto';
  }

  let str = '';

  for (let i = 0; i < minRows; i++) {
    str += `1fr `;
  }

  return `${str} 0 0 0 0 0 0 0 0 0 0 0 0 0 0`
})
</script>

<template>
  <div class="v-section">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.v-section {
  margin-inline: -12px;
  display: grid;
  grid-template-columns: repeat(
      auto-fill,
          minmax(v-bind(minColumnWidth), 1fr)
    );
  grid-template-rows: v-bind(computeGridAutoRows);
  overflow: hidden;
  grid-auto-rows: min-content;
  justify-content: center;
}
</style>