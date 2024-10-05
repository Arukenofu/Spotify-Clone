<script setup lang="ts">
defineProps<{
  text: string;
  error?: any;
}>();

const model = defineModel<string>();
</script>

<template>
  <div class="select">
    <select
      v-model="model"
      :class="!!error && 'error'"
    >
      <option
        selected
        disabled
      >
        {{ text }}
      </option>
      <slot />
    </select>
    <svg viewBox="0 0 16 16">
      <path
        d="M.47 4.97a.75.75 0 0 1 1.06 0L8 11.44l6.47-6.47a.75.75 0 1 1 1.06 1.06L8 13.56.47 6.03a.75.75 0 0 1 0-1.06z"
      />
    </svg>
  </div>
</template>

<style scoped>
.select {
  display: flex;
  position: relative;
  align-items: center;

  select {
    width: 100%;
    display: block;
    font-size: 1rem;
    font-weight: 400;
    height: 50px;
    border-radius: 4px;
    padding-block: 8px;
    padding-inline: 14px 44px;
    background-color: var(--ui);
    border: 2px solid #727272;
    outline: none;
    transition: border 0.2s ease-in-out;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: '';

    &:hover,
    &:focus {
      border: 2px solid var(--white);
    }
  }

  .error {
    border: 2px solid #e91429;

    &:hover,
    &:focus {
      border: 2px solid #e91429;
    }
  }

  svg {
    width: 16px;
    position: absolute;
    right: 16px;
    fill: var(--text-soft);
  }
}
</style>
