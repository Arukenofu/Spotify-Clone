<script setup lang="ts">
import LongRoundButton from '@/shared/UI/Buttons/LongRoundButton.vue'

const buttonInfo = [
  {
    mainText: 'Создай свой первый плейлист',
    bodyText: 'Это совсем не сложно! Мы поможем.',
    buttonText: 'Создать плейлист',
  },
  {
    mainText: 'Подпишись на интересные подкасты',
    bodyText: 'Ты будешь узнавать о новых выпусках.',
    buttonText: 'Обзор',
  },
]
</script>

<template>
  <div class="no-media-lib">
    <section
      v-for="{ mainText, bodyText, buttonText } in buttonInfo"
      :key="mainText"
      class="create-playlist"
    >
      <div class="head-text">
        <span class="main">{{ mainText }}</span>
        <span class="body">{{ bodyText }}</span>
      </div>

      <LongRoundButton class="link-button">
        {{ buttonText }}
      </LongRoundButton>
    </section>
  </div>
</template>

<style scoped lang="scss">
.no-media-lib {
  display: grid;
  gap: 4px;

  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background-color: var(--ui-highlight);
    border-radius: 8px;
    gap: 20px;
    margin: 8px 0;
    padding: 16px 20px;
    user-select: none;

    .head-text {
      display: flex;
      flex-direction: column;
      gap: 11px;

      .main {
        font-weight: 700;
        font-size: 1rem;
      }

      .body {
        font-weight: 500;
        font-size: .875rem;
      }
    }

    .link-button {
      font-weight: 700;
      color: var(--black);
      background-color: var(--white);
    }
  }
}
</style>
