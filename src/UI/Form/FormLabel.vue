<script setup lang="ts">
withDefaults(
  defineProps<{
    color?: string;
    margin?: string;
    fontWeight?: number | string;
    fontSize?: string;
  }>(),
  {
    color: 'inherit',
    margin: '0 0 9px',
    fontWeight: 700,
    fontSize: '.9rem'
  }
);
</script>

<template>
  <label>
    <slot />
  </label>
</template>

<style lang="scss" scoped>
label {
  color: v-bind('color');
  font-weight: v-bind('fontWeight');
  margin: v-bind('margin');
  font-size: v-bind('fontSize');
}
</style>
