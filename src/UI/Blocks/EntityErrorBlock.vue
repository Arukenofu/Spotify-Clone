<script setup lang="ts">
import DangerIcon from "@/UI/Icons/Shared/DangerIcon.vue";

interface Props {
  entity: string;
}

defineProps<Props>();
</script>

<template>
  <div class="v-error">
    <DangerIcon class="icon" />
    <h1 class="title">Не удалось найти {{entity}}</h1>
    <p class="body">Попробуй поискать что-нибудь другое.</p>
  </div>
</template>

<style scoped lang="scss">
.v-error {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  text-align: center;

  .icon {
    fill: var(--white);
    width: 64px;
    height: 64px;
  }

  .title {
    font-family: var(--title-font);
    font-weight: 700;
    text-wrap: balance;
    font-size: 2rem;
  }

  .body {
    font-size: 1rem;
    font-weight: 400;
  }
}
</style>