<script setup lang="ts">
import ErrorBlock from "@/UI/Blocks/ErrorBlock.vue";

defineProps<{
  query: string;
}>();
</script>

<template>
  <ErrorBlock class="not-found" :is-icon="false" size="regular">
    <template #title>
      По запросу «{{query}}» ничего не найдено
    </template>
    <template #body>
      Проверь, нет ли опечаток, сократи запрос или перефразируй его.
    </template>
  </ErrorBlock>
</template>

<style scoped lang="scss">
.not-found {
  max-width: 90%;
  margin: 0 auto;
}
</style>