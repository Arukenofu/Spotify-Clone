<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

import FormLabel from '@/UI/Form/FormLabel.vue';
import FormInput from '@/UI/Form/FormInput.vue';
import FormButton from '@/UI/Form/FormButton.vue';

import stepStore from '@/widgets/SignUp/store/stepStore';

import type { FirstStepForm } from '@/widgets/SignUp/types/form';
import Pin from '@/UI/Icons/Shared/RoundCheckIcon.vue';
import { useMutation } from '@tanstack/vue-query';
import authService from '@/services/api/auth/apiAuthService';

const { step, form } = stepStore();

const currentForm = reactive<FirstStepForm>({
  password: ''
});

interface ErrorForm {
  length: boolean,
  digitSpecial: boolean,
  letter: boolean
}

const errorForm = ref<ErrorForm | {}>({});

function isError(key: keyof ErrorForm) {
  if (!Object.keys(errorForm.value).length) {
    return false;
  }

  // @ts-ignore
  return !errorForm.value[key]
}

const passwordRuleValidation = computed<{
  text: string,
  key: keyof ErrorForm,
  achieved: boolean
}[]>(() => {
  const { password } = currentForm;

  const isHasOneLetter = /[a-zA-Z]/.test(password);
  const isHasSpecialSymbolOrNumber = /[\d#?!&]/.test(password);
  const isHas6Symbol = password.length >= 6;

  return [
    {
      text: '1 букву',
      key: 'length',
      achieved: isHasOneLetter
    },
    {
      text: '1 цифру или специальный символ (например, # ? ! &)',
      key: 'digitSpecial',
      achieved: isHasSpecialSymbolOrNumber
    },
    {
      text: '6 символов',
      key: 'letter',
      achieved: isHas6Symbol
    }
  ];
});

const {mutate: validate} = useMutation({
  mutationKey: ['registerPassword'],
  mutationFn: async () => await authService.validatePassword(currentForm.password),
  onError: (error) => {
    errorForm.value = JSON.parse(error.message) as ErrorForm;
  },
  onSuccess: () => {
    step.value++;
    form.value.password = currentForm.password;
  }
})
</script>

<template>
  <form @submit.prevent="validate()">
    <FormLabel>Пароль</FormLabel>
    <FormInput
      v-model="currentForm.password"
      class="input"
      type="password"
      :error="Object.keys(errorForm).length"
      @input="errorForm = {}"
    />

    <div class="rules">
      <label>Пароль должен содержать как минимум:</label>
      <div
        v-for="(rule) in passwordRuleValidation"
        :key="rule.text"
        class="rule"
      >
        <span class="icon">
          <Pin :achieve="rule.achieved" />
        </span>

        <span
          class="text"
          :class="isError(rule.key) && 'alert'"
        >
          {{ rule.text }}
        </span>
      </div>
    </div>

    <FormButton> Далее </FormButton>
  </form>
</template>

<style lang="scss" scoped>
form {
  label {
    margin-bottom: 9px;
    font-weight: 700;
    font-size: 0.9em;
  }

  .rules {
    margin-bottom: 24px;

    label {
      display: block;
      margin-bottom: 7px;
    }

    .rule {
      margin-bottom: 7px;
      display: flex;
      gap: 6px;

      .icon svg {
        width: 12px;
      }

      .text {
        position: relative;
        top: 1px;
        font-size: 0.9em;
        line-height: 1.4;
      }

      .alert {
        color: #f15e6c;
      }
    }
  }

  .input {
    margin-bottom: 21px;
  }
}
</style>
