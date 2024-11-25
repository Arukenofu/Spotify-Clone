<script setup lang="ts">
import {reactive} from 'vue';
import Logo from '@/UI/Icons/Shared/Logo.vue';
import FormLabel from '@/UI/Form/FormLabel.vue';
import FormInput from '@/UI/Form/FormInput.vue';
import FormCheckboxIOS from '@/UI/Form/FormCheckboxIOS.vue';
import FormButton from '@/UI/Form/FormButton.vue';
import ErrorIcon from '@/UI/Icons/Shared/ErrorIcon.vue';
import FormError from '@/UI/Form/FormError.vue';
import setTitle from '@/shared/utils/setTitle';
import {router} from '@/app/router';
import {useMutation} from '@tanstack/vue-query';
import authService from '@/services/api/auth/apiAuthService';

setTitle('Войти - Spotify');

definePage({
  meta: {
    layout: false
  },
});

const form = reactive({
  email: '',
  password: '',
  isRemember: true
});

const fieldErrors = reactive({
  email: false,
  password: false
});

const {mutate: login, error} = useMutation({
  mutationKey: ['login'],
  mutationFn: () => authService.LoginToAccount(form),
  onSuccess: () => {
    router.push('/');
  }
})

</script>

<template>
  <main>
    <form @submit.prevent="login()">
      <Logo class="logo" />
      <h1>Войти в Spotify</h1>
      <div
        v-if="error"
        class="errorField"
      >
        <ErrorIcon class="icon" />
        {{error.message}}
      </div>
      <div class="inputs">
        <FormLabel
          margin="16px 0 6px"
          font-size=".85rem"
        >
          Электронная почта или имя пользователя
        </FormLabel>
        <FormInput
          v-model="form.email"
          placeholder="Электронная почта или имя пользователя"
          class="input"
          :error="fieldErrors.email"
        />
        <FormError
          v-if="fieldErrors.email"
          class="formError"
        >
          Введите имя пользователя или адрес электронной почты из аккаунта
          Spotify.
        </FormError>
        <FormLabel
          margin="16px 0 6px"
          font-size=".85rem"
        >
          Пароль
        </FormLabel>
        <FormInput
          v-model="form.password"
          placeholder="Пароль"
          class="input"
          :error="fieldErrors.password"
          type="password"
        />
        <FormError
          v-if="fieldErrors.password"
          class="formError"
        >
          Введите пароль вашего аккаунта Spotify.
        </FormError>
      </div>
      <div class="isRemember">
        <FormCheckboxIOS
          v-model="form.isRemember"
          @click="form.isRemember = !form.isRemember"
        />
        <span> Запомнить меня </span>
      </div>
      <FormButton class="button">
        Войти
      </FormButton>
      <hr>
      <div class="noAccount">
        Нет аккаунта?
        <RouterLink to="/signup">
          Регистрация в Spotify
        </RouterLink>
      </div>
    </form>
  </main>
</template>

<style lang="scss" scoped>
main {
  min-height: 100dvh;
  width: 100dvw;
  background: linear-gradient(rgba(255, 255, 255, 0.1) 0%, rgb(0, 0, 0) 100%);
  padding: 32px;
  display: flex;
  justify-content: center;
  flex: 3 1 0;
  --login-size: 325px;

  form {
    padding: 32px 100px 0;
    border-radius: var(--border-radius);
    background-color: var(--ui);
    width: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .logo {
      width: 36px;
      height: 36px;
      fill: var(--white);
      margin-bottom: 27px;
    }

    h1 {
      font-weight: 800;
      margin-bottom: 35px;
    }

    .errorField {
      width: 100%;
      background-color: #e9142a;
      display: flex;
      align-items: center;
      padding: 12px 16px 12px 16px;
      gap: 12px;
      font-size: 0.9rem;

      .icon {
        width: 20px;
        height: 20px;
        fill: var(--white);
      }
    }

    .formError {
      margin-top: 9px;
    }

    .inputs {
      display: flex;
      flex-direction: column;
      width: var(--login-size);

      .input {
        width: 100%;

        &:placeholder-shown {
          text-overflow: ellipsis;
        }
      }
    }

    .isRemember {
      margin: 24px 0;
      display: flex;
      align-items: center;
      gap: 6px;
      width: var(--login-size);

      span {
        font-size: 0.7rem;
        user-select: none;
      }
    }

    .button {
      margin-top: 12px;
      width: var(--login-size);
    }

    hr {
      width: 100%;
      margin: 42px 0 0;
      border-width: 1px medium medium;
      border-style: solid none none;
      border-color: rgb(41, 41, 41) currentcolor currentcolor;
    }

    .noAccount {
      margin: 42px 0;
      color: var(--text-soft);
      font-size: 1rem;

      a {
        color: var(--white);
        font-weight: 600;
        text-decoration: underline;

        &:hover {
          color: var(--main-color);
        }
      }
    }
  }
}

@media screen and (max-width: 792px) {
  main {
    padding: 0;

    form {
      width: 100%;
      position: relative;

      hr {
        display: none;
      }

      .noAccount {
        position: absolute;
        bottom: 20px;
        font-size: 0.95em;
      }
    }
  }
}

@media screen and (max-width: 500px) {
  main {
    --login-size: 95%;

    form {
      padding: 32px 32px 0 !important;
    }
  }
}

@media screen and (max-width: 420px) {
  main {
    --login-size: 90%;

    form {
      padding: 0 !important;
    }
  }
}
</style>
