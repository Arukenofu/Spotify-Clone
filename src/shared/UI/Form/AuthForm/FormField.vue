<script setup lang="ts">
import FormInput from '@/shared/UI/Form/AuthForm/FormInput.vue';
import FormError from '@/shared/UI/Form/AuthForm/FormError.vue';

interface Props {
  error?: any;
}

defineProps<Props>();
</script>

<template>
  <div class="field">
    <FormInput
      :error="!!error"
      class="input"
      v-bind="$attrs"
    />

    <FormError v-if="!!error">
      <slot />
    </FormError>
  </div>
</template>

<style lang="scss" scoped>
.input {
  width: 100%;
  margin-bottom: 12px;
}
</style>
