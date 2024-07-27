<script setup lang="ts">
import {ref} from "vue";

import Logo from "@/UI/Icons/Shared/Logo.vue";
import ZeroStep from "@/modules/SignUp/Steps/ZeroStep.vue";
import StepIndicator from "@/modules/SignUp/components/StepIndicator.vue";
import StepProgressBar from "@/modules/SignUp/components/StepProgressBar.vue";
import FirstStep from "@/modules/SignUp/Steps/FirstStep.vue";
import SecondStep from "@/modules/SignUp/Steps/SecondStep.vue";

const step = ref<number>(2);

</script>

<template>
  <div class="content">
    <Logo class="logo" />
    <ZeroStep v-model:step="step" v-if="step === 0" />

    <div v-else class="steps-wrapper">

      <StepIndicator v-model:step="step" />

      <StepProgressBar v-model:step="step" />

      <div class="wrapper" :class="`step-${step}`">

        <FirstStep v-if="step === 1" v-model:step="step" />

        <SecondStep v-if="step === 2" v-model:step="step" />

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

    &:deep {
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