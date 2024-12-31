<script setup lang="ts">
import {useI18n} from "vue-i18n";
import type {ButtonHTMLAttributes} from "vue";

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {
  isSubscribed: boolean
}
defineProps<Props>();

const {t} = useI18n();
</script>

<template>
  <button class="subscription">
    {{ isSubscribed ? t('social.unsubscribe') : t('social.subscribe') }}
  </button>
</template>

<style scoped lang="scss">
.subscription {
  font-size: .875rem;
  font-weight: 700;
  background: transparent;
  border: 1px solid #7c7c7c;
  border-radius: 500px;
  padding: 4px 16px;
  height: 32px;
  cursor: pointer;
  position: relative;
  text-align: center;
  transition-duration: 33ms;
  transition-property: background-color, border-color, color, box-shadow, filter, transform;
  user-select: none;
  transform: translate3d(0px, 0px, 0px);

  &:hover {
    transform: scale(1.04);
    border: 1px solid var(--white);
  }
}
</style>