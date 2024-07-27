<script setup lang="ts">
import FormLabel from "@/UI/Form/FormLabel.vue";
import FormInput from "@/UI/Form/FormInput.vue";
import {ref} from "vue";
import rules from "@/modules/SignUp/constants/rules";
import FormButton from "@/UI/Form/FormButton.vue";

const step = defineModel<number>('step', {
  required: true
});

const passwordRules = ref(rules);
</script>

<template>
  <form @submit.prevent="step++">
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
</template>

<style scoped>
form {
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
</style>