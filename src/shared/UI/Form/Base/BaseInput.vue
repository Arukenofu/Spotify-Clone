<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue'

/* @vue-ignore */
interface Props extends InputHTMLAttributes {

}

defineProps<Props>()
</script>

<template>
  <input class="v-input" v-bind="$props">
</template>

<style scoped lang="scss">
.v-input {
  background: hsla(0,0%,100%,.1);
  border: 1px solid transparent;
  border-radius: 4px;
  color: #fff;
  font-family: inherit;
  font-size: 14px;
  height: 40px;
  padding: 0 12px;
  width: 100%;

  &:focus {
    background-color: #333;
    border: 1px solid #535353;
    outline: none;
  }
}
</style>
