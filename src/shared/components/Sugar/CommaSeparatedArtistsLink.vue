<script setup lang="ts">
import CommaSeparatedEntityLink from '@/shared/components/CommaSeparatedEntityLink.vue'

defineProps<{
  artists: { id: string, name: string }[]
}>()
</script>

<template>
  <CommaSeparatedEntityLink entity="artist" :entities="artists" />
</template>

<style lang="scss">
</style>
