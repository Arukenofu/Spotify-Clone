<script setup lang="ts">

</script>

<template>
  <div class="control-section">
    <div class="control-description">
      <span class="inner">
        <slot name="description" />
      </span>
    </div>
    <div class="control-action">
      <slot name="action" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.control-section {
  display: grid;
  gap: 8px 24px;
  grid-template-columns: 2fr 1fr;

  .control-description {
    color: var(--text-soft);
    display: flex;
    align-items: center;

    .inner {
      line-height: 1.3;
      font-size: .875rem;
      font-weight: 500;
      color: currentColor;
    }
  }

  .control-action {
    display: flex;
    justify-content: right;
  }
}
</style>
