<script setup lang="ts">
import Logo from "@/UI/Icons/Shared/Logo.vue";
import FormLabel from "@/UI/Form/FormLabel.vue";
import FormInput from "@/UI/Form/FormInput.vue";
import FormCheckboxIOS from "@/UI/Form/FormCheckboxIOS.vue";
import {reactive, ref} from "vue";
import FormButton from "@/UI/Form/FormButton.vue";
import ErrorIcon from "@/UI/Icons/Shared/ErrorIcon.vue";
import FormError from "@/UI/Form/FormError.vue";
import {router} from "@/router";
import {LoginToAccount} from "@/services/api/authService";

const form = reactive({
  email: '',
  password: '',
  isRemember: true,
});
const error = ref<boolean>(false);
const fieldErrors = reactive({
  email: false,
  password: false
})

async function loginToAccount() {
  const {email, password} = form;

  const isEmailError = !email || email.length < 6 || !(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
  if (isEmailError) {
    fieldErrors.email = true;
    return;
  }
  const isPasswordError = !password || password.length < 6;
  if (isPasswordError) {
    fieldErrors.password = true;
    return;
  }

  await LoginToAccount(form).then(() => {
    router.push('/');
  }).catch(() => {
    error.value = true;
  });


}

</script>

<template>
  <main>
    <form @submit.prevent="loginToAccount()">
      <Logo class="logo" />
      <h1>Войти в Spotify</h1>
      <div class="errorField" v-if="error">
        <ErrorIcon class="icon" />
        Неправильное имя пользователя или пароль.
      </div>
      <div class="inputs">
        <FormLabel margin="16px 0 6px" font-size=".85rem">
          Электронная почта или имя пользователя
        </FormLabel>
        <FormInput
            placeholder="Электронная почта или имя пользователя"
            class="input"
            v-model="form.email"
            :error="fieldErrors.email"
            @input="fieldErrors.email = false"
        />
        <FormError v-if="fieldErrors.email" class="formError">
          Введите имя пользователя или адрес электронной почты из аккаунта Spotify.
        </FormError>
        <FormLabel margin="16px 0 6px" font-size=".85rem">
          Пароль
        </FormLabel>
        <FormInput
            placeholder="Пароль"
            class="input"
            v-model="form.password"
            :error="fieldErrors.password"
            @input="fieldErrors.password = false"
            type="password"
        />
        <FormError v-if="fieldErrors.password" class="formError">
          Введите пароль вашего аккаунта Spotify.
        </FormError>
      </div>
      <div class="isRemember">
        <FormCheckboxIOS v-model="form.isRemember" @click="form.isRemember =! form.isRemember" />
        <span>
            Запомнить меня
        </span>
      </div>
      <FormButton class="button">
        Войти
      </FormButton>
      <hr>
      <div class="noAccount">
        Нет аккаунта? <RouterLink to="/signup">Регистрация в Spotify</RouterLink>
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
      font-size: .9rem;

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
        font-size: .7rem;
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
        font-size: .95em;
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

<route lang="yaml">
meta:
  layout: false
</route>