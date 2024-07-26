<script setup lang="ts">

</script>

<template>
  <div class="error">
    <svg data-encore-id="icon" role="img" aria-label="Error:" aria-hidden="true" class="Svg-sc-ytk21e-0 yRCSX IconExclamationCircleForText-sc-1lnefk5-0 etXZXV" viewBox="0 0 16 16"><path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path><path d="M7.25 9V4h1.5v5h-1.5zm0 3.026v-1.5h1.5v1.5h-1.5z"></path></svg>

    <span>
      <slot />
    </span>
  </div>
</template>

<style lang="scss" scoped>
  .error {
    display: flex;
    gap: 4px;

    svg {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      fill: #f15e6c;
    }

    span {
      position: relative;
      bottom: 3px;
      color: #f15e6c;
      line-height: 1.35;
      font-size: .9rem;
    }
  }
</style>