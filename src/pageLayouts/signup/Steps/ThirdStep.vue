<script setup lang="ts">
import FormCheckbox from '@/UI/Form/AuthForm/FormCheckbox.vue';
import FormButton from '@/UI/Form/AuthForm/FormButton.vue';
import {inject, ref} from 'vue';
import FormError from '@/UI/Form/AuthForm/FormError.vue';
import {router} from '@/app/router';
import {useMutation} from '@tanstack/vue-query';
import authService from '@/services/api/auth/apiAuthService';
import type {RegisterForm} from "@/services/api/auth/types/RegisterForm";

const globalRegisterForm = inject<RegisterForm>('globalRegisterForm');

const terms = ref([
  {
    text: 'Я не хочу получать рекламные сообщения от Spotify.',
    checked: false
  },
  {
    text: 'Я разрешаю сообщить мои регистрационные данные партнерам Spotify в целях рекламы.',
    checked: false
  },
  {
    text: 'Я принимаю Условия использования и Политику конфиденциальности Spotify.',
    checked: false
  }
]);
const isError = ref<boolean>(false);

const {mutate: register} = useMutation({
  mutationKey: ['register'],
  mutationFn: () => authService.RegisterAccount(globalRegisterForm!),
  onSuccess: async () => {
    await router.push('/login');
  }
})

async function validateWholeForm() {
  isError.value = terms.value.some(term => !term.checked);

  if (isError.value) return;

  register();
}
</script>

<template>
  <form @submit.prevent="validateWholeForm()">
    <div
      v-for="term in terms"
      :key="term.text"
      class="term"
      @click="term.checked = !term.checked"
    >
      <div class="check">
        <FormCheckbox v-model="term.checked" />
      </div>
      <div class="text">
        {{ term.text }}
      </div>
    </div>

    <FormError
      v-if="isError"
      class="error"
    >
      Чтобы продолжить, примите Условия использования.
    </FormError>

    <FormButton class="button">
      Зарегистрироваться
    </FormButton>
  </form>
</template>

<style lang="scss" scoped>
form {
  display: grid;
  gap: 8px;

  .term {
    background-color: #232323;
    display: flex;
    padding: 21px 15px;
    gap: 12px;
    border-radius: 6px;
    cursor: initial;

    .text {
      position: relative;
      bottom: 4px;
      font-size: 0.9rem;
      line-height: 1.4;
    }
  }

  .error {
    margin-top: 3px;
  }

  .button {
    margin-top: 28px;
  }
}
</style>
