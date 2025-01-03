<script setup lang="ts">
import FormCheckbox from '@/shared/UI/Form/AuthForm/FormCheckbox.vue';
import FormButton from '@/shared/UI/Form/AuthForm/FormButton.vue';
import {inject, ref} from 'vue';
import FormError from '@/shared/UI/Form/AuthForm/FormError.vue';
import {router} from '@/app/router';
import {useMutation} from '@tanstack/vue-query';
import authService from '@/services/api/auth/apiAuthService';
import type {RegisterForm} from "@/services/api/auth/types/RegisterForm";
import {useI18n} from "vue-i18n";

const {t} = useI18n();

const globalRegisterForm = inject<RegisterForm>('globalRegisterForm');

const terms = ref([
  {
    text: t('signup.third.notSendAdvertisement'),
    checked: false
  },
  {
    text: t('signup.third.agreeToProvideInformationToPartners'),
    checked: false
  },
  {
    text: t('signup.third.agreeWithPolicy'),
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
      {{t('signup.third.onNotAgreedWithAllTerms')}}
    </FormError>

    <FormButton class="button">
      {{t('signup.third.register')}}
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
