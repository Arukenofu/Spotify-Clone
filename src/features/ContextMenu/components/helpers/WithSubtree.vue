<script setup lang="ts">
import {Tippy} from "vue-tippy";
</script>

<template>
  <Tippy
    :offset="[0, 1]"
    theme="context"
    placement="auto-start"
    interactive
  >
    <slot />

    <template #content>
      <slot name="context" />
    </template>
  </Tippy>
</template>

<style scoped lang="scss">

</style>