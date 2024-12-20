<script setup lang="ts">
import PreferencesControl from "@/pageLayouts/preferences/PreferencesControl.vue";
import PreferencesControlSection from "@/pageLayouts/preferences/PreferencesControlSection.vue";
import OutsideLinkIcon from "@/UI/Icons/Shared/OutsideLinkIcon.vue";
import BaseIosCheckbox from "@/UI/Form/Base/BaseIosCheckbox.vue";
import {ref} from "vue";

const value = ref<boolean>(false);
</script>

<template>
  <div class="preferences">
    <div class="heading">
      <h1 class="heading-text">Настройки</h1>
      <div class="search">
      </div>
    </div>

    <div class="controls-wrapper">
      <PreferencesControl>
        <template #name>
          Аккаунт
        </template>

        <template #section>
          <PreferencesControlSection>
            <template #description>
              Изменить способы входа
            </template>
            <template #action>
              <button class="change-account-preferences">
                Изменить

                <OutsideLinkIcon class="icon" />
              </button>
            </template>
          </PreferencesControlSection>
        </template>
      </PreferencesControl>

      <PreferencesControl>
        <template #name>
          Язык
        </template>

        <template #section>
          <PreferencesControlSection>
            <template #description>
              Выбери язык. Изменения вступят в силу после перезапуска приложения.
            </template>

            <template #action>
              <select class="change-language">
                <option value="en">English (English)</option>
                <option value="ru">Русский (Russian)</option>
              </select>
            </template>
          </PreferencesControlSection>
        </template>
      </PreferencesControl>


      <PreferencesControl>
        <template #name>
          Приватность
        </template>

        <template #section>
          <PreferencesControlSection>
            <template #description>
              Показывать в открытом профиле мои списки подписчиков и подписок
            </template>

            <template #action>
              <BaseIosCheckbox v-model="value" @click="value =! value" />
            </template>
          </PreferencesControlSection>
        </template>
      </PreferencesControl>
    </div>
  </div>
</template>

<style scoped lang="scss">
.preferences {
  margin: 0 auto;
  max-width: 900px;
  padding: 32px 32px 16px;

  .heading {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;

    .heading-text {
      font-weight: 700;
      line-height: 1.375;
      padding-bottom: 16px;
    }
  }

  .controls-wrapper {
    display: flex;
    flex-direction: column;
    gap: 24px;

    .change-account-preferences {
      display: flex;
      align-items: center;
      gap: 3px;
      font-weight: 700;
      font-size: .875rem;
      padding: 8px 16px;
      background: none;
      border: 1px solid #7c7c7c;
      border-radius: 500px;
      transform: translate3d(0px, 0px, 0px);
      cursor: pointer;

      &:hover {
        scale: 1.04;
        border: 1px solid var(--white);
      }

      .icon {
        width: 16px;
        height: 16px;
        fill: var(--white);
      }
    }

    .change-language {
      background-color: #333;
      border: none;
      border-radius: 4px;
      width: 100%;
      height: 32px;
      padding: 0 32px 0 12px;
      line-height: 20px;
      font-weight: 500;
      color: hsla(0,0%,100%,.7);

      & > option {
        color: hsla(0,0%,100%,.7);
        font-family: Arial;
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
      }
    }
  }
}
</style>