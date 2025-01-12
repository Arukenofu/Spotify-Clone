<script setup lang="ts">
import {onMounted, onUnmounted, ref, useTemplateRef} from "vue";

const {
  parentElement,
  passingHeight = 128
} = defineProps<{
  parentElement: HTMLElement;
  passingHeight?: number;
}>();

const stickyTableHead = useTemplateRef<HTMLElement>('stickyTableHead');
const isSticky = ref<boolean>(false);

function setIsSticky() {
  isSticky.value = !!(stickyTableHead.value && stickyTableHead.value.getBoundingClientRect().top <= passingHeight);
}

onMounted(() => {
  parentElement.addEventListener('scroll', setIsSticky);
});

onUnmounted(() => {
  parentElement.removeEventListener('scroll', setIsSticky);
});
</script>

<template>
  <div ref="stickyTableHead" class="v-music-row-header-wrapper" :class="isSticky && 'stuck'">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.v-music-row-header-wrapper {
  position: sticky;
  top: 64px;
  width: 100%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1 !important;
  margin-bottom: var(--content-spacing);
}

.stuck {
  background-color: var(--ui-highlight);
}
</style>