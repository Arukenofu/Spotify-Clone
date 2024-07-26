<script setup lang="ts">
import Logo from "@/UI/Icons/Shared/Logo.vue";
import {ref} from "vue";
import FormInput from "@/UI/Form/FormInput.vue";
import FormLabel from "@/UI/Form/FormLabel.vue";
import FormButton from "@/UI/Form/FormButton.vue";
import FormField from "@/components/FormField.vue";
import FormSelect from "@/UI/Form/FormSelect.vue";

const step = ref<number>(2);

const passwordRules = ref([
  {
    achieved: false,
    text: '1 букву'
  },
  {
    achieved: false,
    text: '1 цифру или специальный символ (например, # ? ! &)'
  },
  {
    achieved: false,
    text: '10 символов'
  },
]);

const months = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

</script>

<template>
  <main>
    <div class="content">
      <Logo class="logo" />

      <div class="face" v-if="step === 0">
        <h1>
          Зарегистрируйтесь и погрузитесь в музыку
        </h1>

        <form @submit.prevent="step++">
          <FormLabel>Электронная почта</FormLabel>

          <FormField class="input" type="email" placeholder="example@domain.com">
            Неверный адрес электронной почты.<br>
            Проверьте, нет ли опечаток, и попробуйте еще раз.
          </FormField>

          <FormButton class="button">
            Далее
          </FormButton>
        </form>
      </div>

      <div v-else class="steps-wrapper">

        <div class="progress-bar">
          <div class="progress-bar-inner" :style="`width: ${Math.ceil(33.3333333 * step)}%`" />
        </div>

        <div class="steps">
          <button class="previous" @click="step--">
            <span aria-hidden="true" class="IconWrapper__Wrapper-sc-16usrgb-0 hhAMGv"><svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" class="Svg-sc-ytk21e-0 jDHChT"><path d="M15.957 2.793a1 1 0 0 1 0 1.414L8.164 12l7.793 7.793a1 1 0 1 1-1.414 1.414L5.336 12l9.207-9.207a1 1 0 0 1 1.414 0z"></path></svg></span>
          </button>
          <div class="indicator">
            <span class="counter">Шаг {{step}} из 3</span>
            <span class="text">
              <template v-if="step === 1">
                Придуймайте пароль
              </template>

              <template v-if="step === 2">
                Расскажите о себе
              </template>
            </span>
          </div>
        </div>

        <div class="wrapper" :class="`step-${step}`">

          <form v-if="step === 1" @submit.prevent="step++">
            <FormLabel>Пароль</FormLabel>
            <FormInput class="input" type="password" />

            <div class="rules">
              <label>Пароль должен содержать как минимум:</label>
              <div class="rule" v-for="rule in passwordRules" :key="rule.text">
                <span class="icon">
                  <svg v-if="rule.achieved" style="fill: var(--main-color)" data-encore-id="icon" role="img" aria-hidden="true" data-testid="password_requirement_one_letter-true" class="Svg-sc-ytk21e-0 jcyZiX sc-hiDLIP edQIim" viewBox="0 0 16 16"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm11.748-1.97a.75.75 0 0 0-1.06-1.06l-4.47 4.47-1.405-1.406a.75.75 0 1 0-1.061 1.06l2.466 2.467 5.53-5.53z"></path></svg>
                  <svg v-else aria-hidden="true" width="12" height="12" data-testid="password_requirement_one_letter-false"><ellipse cx="6" cy="6" rx="5.5" ry="5.5" stroke="#A7A7A7" stroke-width="1" fill="none"></ellipse></svg>
                </span>

                <span class="text">
                  {{rule.text}}
                </span>
              </div>
            </div>

            <FormButton>
              Далее
            </FormButton>
          </form>

          <form v-if="step === 2" @submit.prevent="step++">

            <FormLabel margin="0 0 3px">
              Название
            </FormLabel>
            <FormLabel color="var(--text-soft)" font-size=".85rem" font-weight="600">
              Ваше имя появится в профиле.
            </FormLabel>
            <FormField type="text" :error="true">
              Укажите имя своего профиля.
            </FormField>

            <FormLabel margin="18px 0 0">
              Дата рождения
            </FormLabel>

            <div class="inputs">
              <FormInput
                  class="day"
                  type="text"
                  maxLength="2"
                  :only-number="true"
                  placeholder="дд"
              />

              <FormSelect text="Месяц" class="month">
                <option v-for="month in months" :key="month">
                  {{month}}
                </option>
              </FormSelect>

              <FormInput
                  class="year"
                  maxLength="4"
                  :only-number="true"
                  placeholder="гггг"
              />
            </div>

            
          </form>

        </div>

      </div>

    </div>
  </main>
</template>

<style lang="scss" scoped>
  main {
    height: 100dvh;
    width: 100dvw;
    background-color: var(--ui);

    .content {
      margin: 0 auto;
      max-width: 420px;
      width: 90%;
      display: flex;
      flex-direction: column;
      align-items: center;

      .logo {
        width: 40px;
        margin: 0 auto;
        fill: var(--white);
        padding: 32px 0 22px;
      }

      .progress-bar {
        height: 3px;
        background-color: #727272;
        width: 100%;
        margin-bottom: 6px;

        .progress-bar-inner {
          height: 100%;
          background-color: var(--main-color);
        }
      }

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
        }

        .button {
          margin-top: 21px;
        }
      }

      .steps {
        display: flex;
        align-items: center;

        .previous {
          width: 56px;
          height: 80px;
          background: none;
          border: none;
          cursor: pointer;
          fill: var(--text-soft);
          padding: 16px;

          &:hover {
            fill: var(--white);
          }
        }

        .indicator {
          display: flex;
          flex-direction: column;

          .counter {
            position: relative;
            bottom: 8px;
            color: var(--text-soft);
          }

          .text {
            font-weight: 700;
          }
        }
      }

      .wrapper {
        width: 80%;
        margin: 14px auto 0;

        form {
          display: flex;
          flex-direction: column;
        }
      }

      .step-1 {
        label {
          margin-bottom: 9px;
          font-weight: 700;
          font-size: .9em;
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
              font-size: .9em;
              line-height: 1.4;
            }


          }
        }

        .input {
          margin-bottom: 21px;
        }
      }

      .step-2 {

        .inputs {
          margin-top: 9px;
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

      }

      .steps-wrapper {
        width: 100%;
      }

    }
  }




</style>

<route lang="yaml">
meta:
  layout: false
</route>