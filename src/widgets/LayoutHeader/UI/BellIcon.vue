<script setup lang="ts">
defineProps<{
  state?: boolean
}>()
</script>

<template>
  <svg
    v-if="state"
    data-encore-id="icon"
    role="img"
    aria-hidden="true"
    viewBox="0 0 16 16"
    class="Svg-sc-ytk21e-0 dCAvla"
  >
    <path
      d="M8 0a5.5 5.5 0 0 0-5.5 5.5v3.069L.307 12.376A.75.75 0 0 0 .25 13h15.5a.75.75 0 0 0-.057-.624L13.5 8.567V5.5A5.5 5.5 0 0 0 8 0zm1.937 14.5H6.063a2 2 0 0 0 3.874 0z"
    />
  </svg>
  <svg
    v-else
    data-encore-id="icon"
    role="img"
    aria-hidden="true"
    viewBox="0 0 16 16"
    class="Svg-sc-ytk21e-0 dYnaPI"
  >
    <path
      d="M8 1.5a4 4 0 0 0-4 4v3.27a.75.75 0 0 1-.1.373L2.255 12h11.49L12.1 9.142a.75.75 0 0 1-.1-.374V5.5a4 4 0 0 0-4-4zm-5.5 4a5.5 5.5 0 0 1 11 0v3.067l2.193 3.809a.75.75 0 0 1-.65 1.124H10.5a2.5 2.5 0 0 1-5 0H.957a.75.75 0 0 1-.65-1.124L2.5 8.569V5.5zm4.5 8a1 1 0 1 0 2 0H7z"
    />
  </svg>
</template>

<style lang="scss" scoped></style>
