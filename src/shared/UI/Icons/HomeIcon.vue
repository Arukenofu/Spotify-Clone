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
    class="Svg-sc-ytk21e-0 bneLcE home-active-icon QbaKKdcHNA2x3_YJvpYu"
    viewBox="0 0 24 24"
  >
    <path
      d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732l-7.5-4.33z"
    />
  </svg>
  <svg
    v-else
    data-encore-id="icon"
    role="img"
    aria-hidden="true"
    viewBox="0 0 24 24"
    class="Svg-sc-ytk21e-0 bneLcE"
  >
    <path
      d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732l7.5-4.33z"
    />
  </svg>
</template>

<style lang="scss" scoped></style>
