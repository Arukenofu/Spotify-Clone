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

const globalRegisterForm = inject<RegisterForm>('globalRegisterForm');
const nextStep = inject<Function>('nextStep');

const genders = ['Мужчина', 'Женщина', 'Другое', 'Не хочу выбирать'];
const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь'
];

const currentForm = reactive<SecondStepForm>({
  username: '',
  day: null,
  month: 'Месяц',
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
  const isMonthFill = month !== 'Месяц';
  const isYearFill = !!year;

  if (!(isDayFill && isMonthFill && isYearFill)) {
    return errors;
  }

  if (day! > 31 || day! < 1) {
    errors.push({
      field: 'day',
      message: 'Введите число от 1 до 31.'
    });
  }

  const today = new Date();
  const userCurrentAge = getCurrentAge(currentForm.day!, currentForm.month, currentForm.year!);

  if (today.getFullYear() <= year!) {
    errors.push({
      field: 'year',
      message: 'Введите действительный год рождения.'
    });
  }

  if (userCurrentAge <= 16) {
    errors.push({
      field: 'year',
      message:
        'Вы еще не достигли возраста, позволяющего создать аккаунт Spotify.'
    });
  }

  if (year < 1900) {
    errors.push({
      field: 'year',
      message: 'Год рождения должен быть не ранее 1900 г.'
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
        Название
      </FormLabel>
      <FormLabel
        color="var(--text-soft)"
        font-size=".85rem"
        font-weight="600"
      >
        Ваше имя появится в профиле.
      </FormLabel>
      <FormField
        v-model="currentForm.username"
        type="text"
        :error="formErrors.username"
      >
        Укажите имя для своего профиля.
      </FormField>
    </div>

    <div class="birthday">
      <FormLabel margin="18px 0 0">
        Дата рождения
      </FormLabel>

      <div class="inputs">
        <FormInput
          v-model.number="currentForm.day"
          class="day"
          type="text"
          max-length="2"
          :only-number="true"
          placeholder="дд"
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
          placeholder="гггг"
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
        Пол
      </FormLabel>
      <FormLabel
        color="var(--text-soft)"
        font-size=".85rem"
        font-weight="600"
        line-height="1.15"
      >
        Мы учитываем пол при подборе персональных рекомендаций и рекламы.
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
          Выберите свой пол.
        </FormError>
      </div>
    </div>

    <FormButton class="button">
      Далее
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
  }

  .button {
    margin-top: 28px;
  }
}
</style>
