<script setup lang="ts">
import ErrorBlock from "@/UI/Blocks/ErrorBlock.vue";

defineProps<{
  query: string;
}>();

</script>

<template>
  <ErrorBlock
    class="not-found"
    :is-icon="false"
    :size="'small'"
  >
    <template #title>
      По запросу «<span>{{query}}</span>» ничего не найдено
    </template>
    <template #body>
      Проверь, нет ли опечаток, или попробуй ввести другой запрос.
    </template>
  </ErrorBlock>
</template>

<style scoped lang="scss">
.not-found {
  max-width: 90%;
  margin: 0 auto;

  span {

    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>