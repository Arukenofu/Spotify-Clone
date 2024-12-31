<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {t} = useI18n();
</script>

<template>
  <div class="noText">
    {{t('lyrics.noLyrics')}}
  </div>
</template>

<style lang="scss" scoped>
.noText {
  width: 100%;
  height: var(--content-height);
  background-color: #333333;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 5rem;
  font-weight: 900;
  padding: 0 52px;
}
</style>
