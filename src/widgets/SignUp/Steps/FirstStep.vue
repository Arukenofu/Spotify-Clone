<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

import FormLabel from '@/UI/Form/FormLabel.vue';
import FormInput from '@/UI/Form/FormInput.vue';
import FormButton from '@/UI/Form/FormButton.vue';

import stepStore from '@/widgets/SignUp/store/stepStore';

import type { FirstStepForm } from '@/widgets/SignUp/types/form';
import Pin from '@/UI/Icons/Shared/Pin.vue';

const { step, form } = stepStore();

const currentForm = reactive<FirstStepForm>({
  password: ''
});

const errorSteps = ref<number[]>([]);

function isError(index: number) {
  if (!errorSteps.value.length) {
    return false;
  }

  return !errorSteps.value[index];
}

const passwordRuleValidation = computed(() => {
  const { password } = currentForm;

  const isHasOneLetter = /[a-zA-Z]/.test(password);
  const isHasSpecialSymbolOrNumber = /[\d#?!&]/.test(password);
  const isHas6Symbol = password.length >= 6;

  return [
    {
      text: '1 букву',
      achieved: isHasOneLetter
    },
    {
      text: '1 цифру или специальный символ (например, # ? ! &)',
      achieved: isHasSpecialSymbolOrNumber
    },
    {
      text: '6 символов',
      achieved: isHas6Symbol
    }
  ];
});

function validateCurrentStep() {
  const isNotPassed = passwordRuleValidation.value.some((obj) => {
    return Object.values(obj).includes(false);
  });

  if (isNotPassed) {
    passwordRuleValidation.value.forEach((obj, index) => {
      if (!obj.achieved) {
        errorSteps.value.push(index);
      }
    });

    return;
  }

  form.value.password = currentForm.password;
  step.value++;
}
</script>

<template>
  <form @submit.prevent="validateCurrentStep()">
    <FormLabel>Пароль</FormLabel>
    <FormInput
      v-model="currentForm.password"
      class="input"
      type="password"
      :error="errorSteps.length"
      @input="errorSteps = []"
    />

    <div class="rules">
      <label>Пароль должен содержать как минимум:</label>
      <div
        v-for="(rule, index) in passwordRuleValidation"
        :key="rule.text"
        class="rule"
      >
        <span class="icon">
          <Pin :achieve="rule.achieved" />
        </span>

        <span
          class="text"
          :class="isError(index) && 'alert'"
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
