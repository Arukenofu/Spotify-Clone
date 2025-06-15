<script setup lang="ts">
import SearchIcon from '@/shared/UI/Icons/SearchIcon.vue'

defineProps<{
  disabled?: boolean
}>()
</script>

<template>
  <div class="searchbar input-outer">
    <SearchIcon class="icon" />
    <input class="inner-input" type="text" placeholder="Что хочешь послушать?" :disabled="disabled">
  </div>
</template>

<style scoped lang="scss">
.input-outer {
  display: flex;
  align-items: center;
  width: 100%;
  background-color: var(--white);
  padding: 8px 15px;
  border-radius: 4px;

  .icon {
    width: 24px;
    height: 24px;
  }

  .inner-input {
    margin-left: 8px;
    border: none;
    outline: none;
    color: var(--black);
    font-weight: 500;
    font-size: 1rem;

    &::placeholder {
      color: var(--black);
    }
  }
}
</style>
