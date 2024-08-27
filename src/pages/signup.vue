<script setup lang="ts">
import {RegistrationForm} from "@/widgets/SignUp";
import setTitle from "@/shared/utils/setTitle";

setTitle('Зарегестрироваться - Spotify');
</script>

<template>
  <main>
    <RegistrationForm />
  </main>
</template>

<style lang="scss" scoped>
  main {
    min-height: 100dvh;
    width: 100dvw;
    background-color: var(--ui);
  }
</style>

<route lang="yaml">
meta:
  layout: false
</route>