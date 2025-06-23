<script setup lang="ts">
import CommaSeparatedEntityLink from '@/shared/components/CommaSeparatedEntityLink.vue'

defineProps<{
  artists: { id: string, name: string }[]
}>()
</script>

<template>
  <CommaSeparatedEntityLink v-bind="$attrs" entity="artist" :entities="artists" />
</template>

<style lang="scss">
</style>
