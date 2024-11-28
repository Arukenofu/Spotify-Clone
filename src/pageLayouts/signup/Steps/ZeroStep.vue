<script setup lang="ts">
import FormButton from '@/UI/Form/AuthForm/FormButton.vue';
import FormField from '@/UI/Form/AuthForm/FormField.vue';
import FormLabel from '@/UI/Form/AuthForm/FormLabel.vue';
import {inject, reactive} from 'vue';
import type {ZeroStepForm} from '@/pageLayouts/signup/types/form';
import {useMutation} from '@tanstack/vue-query';
import authService from '@/services/api/auth/apiAuthService';
import type {RegisterForm} from "@/services/api/auth/types/RegisterForm";

const nextStep = inject<Function>('nextStep');
const globalRegisterForm = inject<RegisterForm>('globalRegisterForm');

const currentForm = reactive<ZeroStepForm>({
  email: ''
});

const {mutate: register, error} = useMutation({
  mutationKey: ['registerEmail'],
  mutationFn: async () => await authService.validateEmail(currentForm.email),
  onSuccess: () => {
    nextStep!();
    globalRegisterForm!.email = currentForm.email;
  }
});

</script>

<template>
  <div class="face">
    <h1>Зарегистрируйтесь и погрузитесь в музыку</h1>

    <form @submit.prevent="register()">
      <FormLabel>Электронная почта</FormLabel>

      <FormField
        v-model="currentForm.email"
        class="input"
        type="text"
        placeholder="example@domain.com"
        :error="error?.message"
      >
        {{error?.message}}
      </FormField>

      <FormButton class="button">
        Далее
      </FormButton>
    </form>

    <div class="separator" />

    <p>Уже есть аккаунт? <RouterLink to="/login">Войдите в него</RouterLink> </p>
  </div>
</template>

<style lang="scss" scoped>
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

    .button {
      margin-top: 21px;
    }
  }

  .separator {
    margin-top: 32px;
    position: relative;
    display: flex;

    &::before {
      content: " ";
      height: 1px;
      background-color: #292929;
      display: block;
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
    }
  }

  p {
    margin-top: 32px;
    display: block;
    text-align: center;
    color: var(--text-soft);

    a {
      color: var(--white);
      text-decoration: underline;
    }
  }
}
</style>
