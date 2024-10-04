<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  error?: any;
  onlyNumber?: boolean;
}

const props = defineProps<Props>();

const model = defineModel();

const inputModel = ref();

function updateModelValue() {
  if (props.onlyNumber) {
    inputModel.value = inputModel.value.replace(/\D/g, '');
  }

  model.value = inputModel.value;
}
</script>

<template>
  <input
    :class="!!error && 'error'"
    @input="updateModelValue()"
    v-model="inputModel"
  />
</template>

<style lang="scss" scoped>
input {
  background-color: var(--ui);
  border: 2px solid #727272;
  outline: none;
  padding: 0 12px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: border 0.2s ease-in-out;
  height: 50px;
  min-width: 0;

  &:hover,
  &:focus {
    border: 2px solid var(--white);
  }

  &[type='password'] {
    font-size: 1.4rem;

    &::placeholder {
      font-size: 0.9rem;
    }
  }

  &[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;
    margin: 0;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}

.error {
  border: 2px solid #e91429;

  &:hover,
  &:focus {
    border: 2px solid #e91429;
  }
}
</style>
