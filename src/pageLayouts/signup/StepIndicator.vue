<script setup lang="ts">
import {inject} from "vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n();

const step = inject<number>('step');
const previousStep = inject<Function>('previousStep');
</script>

<template>
  <div class="steps">
    <button
      class="previous"
      @click="previousStep!()"
    >
      <span
        aria-hidden="true"
        class="IconWrapper__Wrapper-sc-16usrgb-0 hhAMGv"
      ><svg
        data-encore-id="icon"
        role="img"
        aria-hidden="true"
        viewBox="0 0 24 24"
        class="Svg-sc-ytk21e-0 jDHChT"
      >
        <path
          d="M15.957 2.793a1 1 0 0 1 0 1.414L8.164 12l7.793 7.793a1 1 0 1 1-1.414 1.414L5.336 12l9.207-9.207a1 1 0 0 1 1.414 0z"
        /></svg></span>
    </button>
    <div class="indicator">
      <span class="counter">{{t('signup.steps.title', [step])}}</span>
      <span class="added-at">
        <template v-if="step === 1"> {{t('signup.steps.first')}} </template>

        <template v-if="step === 2"> {{t('signup.steps.second')}} </template>

        <template v-if="step === 3"> {{t('signup.steps.third')}} </template>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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

    .added-at {
      font-weight: 700;
    }
  }
}
</style>
