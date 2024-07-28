<script setup lang="ts">
import Logo from "@/UI/Icons/Shared/Logo.vue";
import ZeroStep from "@/modules/SignUp/Steps/ZeroStep.vue";
import StepIndicator from "@/modules/SignUp/components/StepIndicator.vue";
import StepProgressBar from "@/modules/SignUp/components/StepProgressBar.vue";
import FirstStep from "@/modules/SignUp/Steps/FirstStep.vue";
import SecondStep from "@/modules/SignUp/Steps/SecondStep.vue";
import ThirdStep from "@/modules/SignUp/Steps/ThirdStep.vue";
import stepStore from "@/modules/SignUp/store/stepStore";

const {step} = stepStore();

</script>

<template>
  <div class="content">
    <Logo class="logo" />
    <ZeroStep v-if="step === 0" />

    <div v-else class="steps-wrapper">

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

<style scoped>
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