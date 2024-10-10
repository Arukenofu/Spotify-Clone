<script setup lang="ts">
defineProps<{
  achieve: any;
}>();
</script>

<template>
  <svg
    v-if="achieve"
    style="fill: var(--main-color)"
    data-encore-id="icon"
    role="img"
    aria-hidden="true"
    data-testid="password_requirement_one_letter-true"
    class="Svg-sc-ytk21e-0 jcyZiX sc-hiDLIP edQIim"
    viewBox="0 0 16 16"
  >
    <path
      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm11.748-1.97a.75.75 0 0 0-1.06-1.06l-4.47 4.47-1.405-1.406a.75.75 0 1 0-1.061 1.06l2.466 2.467 5.53-5.53z"
    />
  </svg>
  <svg
    v-else
    aria-hidden="true"
    width="12"
    height="12"
    data-testid="password_requirement_one_letter-false"
  >
    <ellipse
      cx="6"
      cy="6"
      rx="5.5"
      ry="5.5"
      stroke="#A7A7A7"
      stroke-width="1"
      fill="none"
    />
  </svg>
</template>

<style lang="scss" scoped></style>
