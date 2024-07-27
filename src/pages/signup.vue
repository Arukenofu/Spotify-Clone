<script setup lang="ts">
import RegistrationForm from "@/modules/SignUp";

</script>

<template>
  <main>
    <RegistrationForm />
  </main>
</template>

<style lang="scss" scoped>
  main {
    height: 100dvh;
    width: 100dvw;
    background-color: var(--ui);
  }
</style>

<route lang="yaml">
meta:
  layout: false
</route>