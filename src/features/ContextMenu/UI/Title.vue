<script setup lang="ts">
defineProps<{
  text: string;
}>();
</script>

<template>
  <span class="title">
    {{ text }}
  </span>
</template>

<style scoped>
.title {
  padding: 12px;
  height: 40px;
  align-items: center;
  font-size: 0.75rem;
  font-weight: 900;
  color: var(--text-soft);
  display: flex;
  user-select: none;
}
</style>
