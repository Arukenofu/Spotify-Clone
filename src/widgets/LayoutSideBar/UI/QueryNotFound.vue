<script setup lang="ts">
import ErrorBlock from "@/UI/Blocks/ErrorBlock.vue";

defineProps<{
  query: string;
}>();

</script>

<template>
  <ErrorBlock
    class="not-found"
    :title="`По запросу «${query}» ничего не найдено`"
    :body="`Проверь, нет ли опечаток, или попробуй ввести другой запрос.`"
    :is-icon="false"
    :size="'small'"
  />
</template>

<style scoped lang="scss">
.not-found {
  max-width: 90%;
  margin: 0 auto;
}
</style>