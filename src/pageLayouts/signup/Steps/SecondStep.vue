<script setup lang="ts">
import {computed, inject, reactive, ref} from 'vue';

import FormLabel from '@/UI/Form/AuthForm/FormLabel.vue';
import FormInput from '@/UI/Form/AuthForm/FormInput.vue';
import FormSelect from '@/UI/Form/AuthForm/FormSelect.vue';
import FormField from '@/UI/Form/AuthForm/FormField.vue';
import FormRadio from '@/UI/Form/AuthForm/FormRadio.vue';
import FormButton from '@/UI/Form/AuthForm/FormButton.vue';
import FormError from '@/UI/Form/AuthForm/FormError.vue';

import type {SecondStepForm} from '@/pageLayouts/signup/types/form';
import type {RegisterForm} from "@/services/api/auth/types/RegisterForm";
import getLocale from "@/app/lib/i18n/utils/getLocale";
import {useI18n} from "vue-i18n";

const globalRegisterForm = inject<RegisterForm>('globalRegisterForm');
const nextStep = inject<Function>('nextStep');

const {t, tm} = useI18n();

const genders = tm('signup.second.genders');

const months = (() => {
  const applyFormat = new Intl.DateTimeFormat(getLocale(), { month: 'long' }).format;
  return [...Array(12).keys()].map((m) => applyFormat(new Date(2021, m)));
})();

const currentForm = reactive<SecondStepForm>({
  username: '',
  day: null,
  month: t('signup.second.month'),
  year: null,
  gender: ''
});
const formErrors = ref({
  username: false,
  gender: false
});

function getCurrentAge(birthDay: number, birthMonthStr: string, birthYear: number) {
  const birthMonth = months.indexOf(birthMonthStr);
  const today = new Date();

  let age = today.getFullYear() - birthYear;
  const monthDifference = today.getMonth() - birthMonth;
  const dayDifference = today.getDate() - birthDay;

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return age;
}

const birthdayValidate = computed(() => {
  const errors: { message: string; field: 'day' | 'month' | 'year' }[] = [];
  const { day, month, year } = currentForm;

  const isDayFill = String(day).length !== 0;
  const isMonthFill = month !== t('signup.second.month');
  const isYearFill = !!year;

  if (!(isDayFill && isMonthFill && isYearFill)) {
    return errors;
  }

  if (day! > 31 || day! < 1) {
    errors.push({
      field: 'day',
      message: t('signup.second.chooseDayFrom1To31')
    });
  }

  const today = new Date();
  const userCurrentAge = getCurrentAge(currentForm.day!, currentForm.month, currentForm.year!);

  if (today.getFullYear() <= year!) {
    errors.push({
      field: 'year',
      message: t('signup.second.chooseRealBirthDay')
    });
  }

  if (userCurrentAge <= 16) {
    errors.push({
      field: 'year',
      message:
          t('signup.second.tooYoung')
    });
  }

  if (year < 1900) {
    errors.push({
      field: 'year',
      message: t('signup.second.tooOld')
    });
  }

  return errors;
});

function validateCurrentStep() {
  formErrors.value = {
    username: false,
    gender: false
  };

  if (!currentForm.username.length) {
    return (formErrors.value.username = true);
  }
  if (!currentForm.gender) {
    return (formErrors.value.gender = true);
  }
  if (birthdayValidate.value.length) {
    return;
  }

  globalRegisterForm!.username = currentForm.username;
  globalRegisterForm!.gender = currentForm.gender;
  globalRegisterForm!.day = currentForm.day;
  globalRegisterForm!.month = currentForm.month;
  globalRegisterForm!.year = currentForm.year;

  nextStep!();
}
</script>

<template>
  <form @submit.prevent="validateCurrentStep()">
    <div class="username">
      <FormLabel margin="0 0 3px">
        {{t('signup.second.username')}}
      </FormLabel>
      <FormLabel
        color="var(--text-soft)"
        font-size=".85rem"
        font-weight="600"
      >
        {{t('signup.second.usernameDesc')}}
      </FormLabel>
      <FormField
        v-model="currentForm.username"
        type="text"
        :error="formErrors.username"
      >
        {{t('signup.second.usernameNotChoose')}}
      </FormField>
    </div>

    <div class="birthday">
      <FormLabel margin="18px 0 0">
        {{t('signup.second.birthday')}}
      </FormLabel>

      <div class="inputs">
        <FormInput
          v-model.number="currentForm.day"
          class="day"
          type="text"
          max-length="2"
          :only-number="true"
          :placeholder="t('signup.second.day')"
        />

        <FormSelect
          v-model="currentForm.month"
          text="Месяц"
          class="month"
        >
          <option
            v-for="month in months"
            :key="month"
          >
            {{ month }}
          </option>
        </FormSelect>

        <FormInput
          v-model.number="currentForm.year"
          class="year"
          max-length="4"
          :only-number="true"
          :placeholder="t('signup.second.year')"
        />
      </div>

      <div
        v-if="birthdayValidate.length"
        class="errors"
      >
        <FormError
          v-for="birthday in birthdayValidate"
          :key="birthday.message"
          class="error"
        >
          {{ birthday.message }}
        </FormError>
      </div>
    </div>

    <div class="gender">
      <FormLabel margin="4px 0 3px">
        {{t('signup.second.gender')}}
      </FormLabel>
      <FormLabel
        color="var(--text-soft)"
        font-size=".85rem"
        font-weight="600"
        line-height="1.15"
      >
        {{t('signup.second.genderDesc')}}
      </FormLabel>

      <div class="radios">
        <FormRadio
          v-for="(gender, index) in genders"
          :key="index"
          v-model="currentForm.gender"
          :index="gender"
          :text="gender"
          name="gender"
        />

        <FormError
          v-if="formErrors.gender"
          class="error"
        >
          {{t('signup.second.genderNotChoose')}}
        </FormError>
      </div>
    </div>

    <FormButton class="button">
      {{t('signup.next')}}
    </FormButton>
  </form>
</template>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 9px;

  .username {
    display: flex;
    flex-direction: column;
  }

  .birthday {
    .inputs {
      margin-top: 9px;
      margin-bottom: 12px;
      display: flex;
      gap: 8px;

      .day {
        width: 20%;
      }

      .month {
        flex: 1;
      }

      .year {
        width: 30%;
      }
    }

    .errors {
      display: grid;
      gap: 6px;
    }
  }

  .gender {
    display: flex;
    flex-direction: column;
  }

  .radios {
    margin-top: 4px;
    display: flex;
    flex-wrap: wrap;
    column-gap: 6px;
    row-gap: 9px;

    .error {
      margin-top: 5px;
    }
  }

  option {
    font-family: 'ProductSans', sans-serif;
    text-transform: capitalize;
  }

  .button {
    margin-top: 28px;
  }
}
</style>
