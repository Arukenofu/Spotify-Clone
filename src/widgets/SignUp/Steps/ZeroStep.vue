<script setup lang="ts">
import FormButton from '@/UI/Form/FormButton.vue';
import FormField from '@/UI/Form/FormField.vue';
import FormLabel from '@/UI/Form/FormLabel.vue';
import { reactive, ref } from 'vue';
import stepStore from '@/widgets/SignUp/store/stepStore';
import type { ZeroStepForm } from '@/widgets/SignUp/types/form';

const { step, form } = stepStore();

const currentForm = reactive<ZeroStepForm>({
  email: ''
});
const isValidationError = ref<boolean>(false);

function validateCurrentStep() {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isEmailValid = emailRegex.test(currentForm.email);

  if (!isEmailValid) {
    return (isValidationError.value = true);
  }

  form.value.email = currentForm.email;
  step.value++;
}
</script>

<template>
  <div class="face">
    <h1>Зарегистрируйтесь и погрузитесь в музыку</h1>

    <form @submit.prevent="validateCurrentStep()">
      <FormLabel>Электронная почта</FormLabel>

      <FormField
        v-model="currentForm.email"
        class="input"
        type="text"
        placeholder="example@domain.com"
        :error="isValidationError"
      >
        Адрес электронной почты недействителен. <br>
        Убедитесь, что он указан в таком формате: example@email.com.
      </FormField>

      <FormButton class="button">
        Далее
      </FormButton>
    </form>
  </div>
</template>

<style scoped>
.face {
  width: 100%;

  h1 {
    margin-top: 12px;
    text-align: center;
    font-weight: 800;
    font-size: 3rem;
    line-height: 1.4;
    word-break: break-word;
    margin-bottom: 35px;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .button {
    margin-top: 21px;
  }
}
</style>
