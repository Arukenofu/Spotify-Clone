<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

import FormLabel from '@/UI/Form/FormLabel.vue';
import FormInput from '@/UI/Form/FormInput.vue';
import FormSelect from '@/UI/Form/FormSelect.vue';
import FormField from '@/UI/Form/FormField.vue';
import FormRadio from '@/UI/Form/FormRadio.vue';
import FormButton from '@/UI/Form/FormButton.vue';
import FormError from '@/UI/Form/FormError.vue';

import months from '@/widgets/SignUp/constants/months';
import stepStore from '@/widgets/SignUp/store/stepStore';
import getCurrentAge from '@/widgets/SignUp/helpers/getCurrentAge';

import type { SecondStepForm } from '@/widgets/SignUp/types/form';

const { step, form: storeForm } = stepStore();

const genders = ['Мужчина', 'Женщина', 'Другое', 'Не хочу выбирать'];

const form = reactive<SecondStepForm>({
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

const birthdayValidate = computed(() => {
  const errors: { message: string; field: 'day' | 'month' | 'year' }[] = [];
  const { day, month, year } = form;

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
  const userCurrentAge = getCurrentAge(form.day!, form.month, form.year!);

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
    console.log(userCurrentAge);
  }

  return errors;
});

function validateCurrentStep() {
  formErrors.value = {
    username: false,
    gender: false
  };

  if (!form.username.length) {
    return (formErrors.value.username = true);
  }
  if (!form.gender) {
    return (formErrors.value.gender = true);
  }
  if (birthdayValidate.value.length) {
    return;
  }

  storeForm.value.username = form.username;
  storeForm.value.gender = form.gender;
  storeForm.value.day = form.day;
  storeForm.value.month = form.month;
  storeForm.value.year = form.year;
  step.value++;
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
        v-model="form.username"
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
          v-model.number="form.day"
          class="day"
          type="text"
          max-length="2"
          :only-number="true"
          placeholder="дд"
        />

        <FormSelect
          v-model="form.month"
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
          v-model.number="form.year"
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
      >
        Мы учитываем пол при подборе персональных рекомендаций и рекламы.
      </FormLabel>

      <div class="radios">
        <FormRadio
          v-for="(gender, index) in genders"
          :key="index"
          v-model="form.gender"
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

  .button {
    margin-top: 28px;
  }
}
</style>
