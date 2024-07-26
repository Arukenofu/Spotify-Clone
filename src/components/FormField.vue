<script setup lang="ts">
import FormInput from "@/UI/Form/FormInput.vue";
import FormError from "@/UI/Form/FormError.vue";

interface Props {
  error?: any
}

defineProps<Props>()

</script>

<template>
  <div class="field">
    <FormInput :error="!!error" class="input" v-bind="$attrs" />

    <FormError v-if="!!error">
      <slot />
    </FormError>
  </div>
</template>

<style scoped>
.input {
  width: 100%;
  margin-bottom: 12px;
}
</style>