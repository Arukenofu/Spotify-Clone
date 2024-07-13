<script setup lang="ts">

withDefaults(defineProps<{
  tag?: string
}>(), {
  tag: 'span'
})

</script>

<template>
  <component :is="tag" class="material-symbols-rounded">
    <slot />
  </component>
</template>

<style scoped>
.material-symbols-rounded {
  font-variation-settings:
      'FILL' 1,
      'wght' 400,
      'GRAD' 0,
      'opsz' 48
}
</style>