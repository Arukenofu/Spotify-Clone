<script setup lang="ts">
import setTitle from '@/shared/utils/setTitle';
import Logo from "@/UI/Icons/Shared/Logo.vue";
import ThirdStep from "@/pageLayouts/signup/Steps/ThirdStep.vue";
import StepIndicator from "@/pageLayouts/signup/StepIndicator.vue";
import FirstStep from "@/pageLayouts/signup/Steps/FirstStep.vue";
import StepProgressBar from "@/pageLayouts/signup/StepProgressBar.vue";
import SecondStep from "@/pageLayouts/signup/Steps/SecondStep.vue";
import ZeroStep from "@/pageLayouts/signup/Steps/ZeroStep.vue";
import type {RegisterForm} from "@/services/api/auth/types/RegisterForm";
import {provide, reactive, ref} from "vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n();

setTitle(t('route-titles.register'));

definePage({
  meta: {
    layout: false
  },
});

const step = ref(0);

function nextStep(): void {
  if (step.value === 3) {
    return;
  }

  step.value++;
}

function previousStep(): void {
  if (step.value === 0) {
    return;
  }

  step.value--;
}

provide('step', step);
provide('nextStep', nextStep);
provide('previousStep', previousStep);

const globalRegisterForm = reactive<RegisterForm>({
  email: '',
  password: '',
  username: '',
  day: null,
  month: '',
  year: null,
  gender: ''
});

provide('globalRegisterForm', globalRegisterForm);
</script>

<template>
  <main>
    <div class="content">
      <Logo class="logo" />
      <ZeroStep v-if="step === 0" />

      <div
        v-else
        class="steps-wrapper"
      >
        <StepProgressBar />

        <StepIndicator />

        <div class="wrapper">
          <FirstStep v-if="step === 1" />

          <SecondStep v-else-if="step === 2" />

          <ThirdStep v-else-if="step === 3" />
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  min-height: 100dvh;
  width: 100dvw;

  .content {
    margin: 0 auto;
    max-width: 420px;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100dvh;

    .logo {
      display: block;
      width: 40px;
      height: 40px;
      fill: var(--white);
      margin-top: 32px;
      margin-bottom: 32px;
    }

    .wrapper {
      width: 80%;
      margin: 14px auto 0;

      :deep(&) {
        global-register-form {
          display: flex;
          flex-direction: column;
        }
      }
    }

    .steps-wrapper {
      width: 100%;
    }
  }
}
</style>
