<script setup lang="ts">
import ErrorBlock from "@/UI/Blocks/ErrorBlock.vue";
import BubbleButton from "@/UI/Buttons/BubbleButton.vue";

function reloadPage() {
  location.reload();
}
</script>

<template>
  <ErrorBlock class="not-found" size="regular">
    <template #title>
      Что-то пошло не так
    </template>
    <template #body>
      Обнови страницу
    </template>
    <template #controls>
      <BubbleButton
        class="button"
        design="green"
        @click="reloadPage()"
      >
        ОБНОВИТЬ
      </BubbleButton>
    </template>
  </ErrorBlock>
</template>

<style scoped lang="scss">
.button {
  height: 48px;
  padding: 0 32px;
  font-size: 1rem;
  text-transform: capitalize;
}
</style>