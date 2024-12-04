<script setup lang="ts">

</script>

<template>
  <div class="track-text-info">
    <div class="track-name">
      <slot name="title" />
    </div>
    <div class="track-artists">
      <slot name="artists" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.track-text-info {
  height: min-content;
  display: grid;
  column-gap: 8px;
  grid-template: "pretitle pretitle" "title title" "badges subtitle"/auto 1fr;
  line-height: 1;

  .track-name {
    grid-area: title;
    cursor: pointer;
    width: 100%;
  }

  .track-artists {
    display: inline-flex;
    grid-area: subtitle;
    grid-column-start: badges;
    align-items: baseline;

    :deep(a) {
      color: var(--text-soft);
      line-height: 1.375;
    }
  }
}
</style>