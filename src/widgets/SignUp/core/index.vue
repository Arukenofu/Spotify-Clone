<script setup lang="ts">
import Logo from '@/UI/Icons/Shared/Logo.vue';
import ZeroStep from '@/widgets/SignUp/Steps/ZeroStep.vue';
import StepIndicator from '@/widgets/SignUp/components/StepIndicator.vue';
import StepProgressBar from '@/widgets/SignUp/components/StepProgressBar.vue';
import FirstStep from '@/widgets/SignUp/Steps/FirstStep.vue';
import SecondStep from '@/widgets/SignUp/Steps/SecondStep.vue';
import ThirdStep from '@/widgets/SignUp/Steps/ThirdStep.vue';
import stepStore from '@/widgets/SignUp/store/stepStore';

const { step } = stepStore();
</script>

<template>
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

        <SecondStep v-if="step === 2" />

        <ThirdStep v-if="step === 3" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
      form {
        display: flex;
        flex-direction: column;
      }
    }
  }

  .steps-wrapper {
    width: 100%;
  }
}
</style>
