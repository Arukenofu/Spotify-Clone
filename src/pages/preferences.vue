<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import PreferencesControl from '@/pageLayouts/preferences/PreferencesControl.vue'
import PreferencesControlSection from '@/pageLayouts/preferences/PreferencesControlSection.vue'
import BubbleButton from '@/shared/UI/Buttons/BubbleButton.vue'
import BaseIosCheckbox from '@/shared/UI/Form/Base/BaseIosCheckbox.vue'
import OutsideLinkIcon from '@/shared/UI/Icons/OutsideLinkIcon.vue'
import { getCookie, setCookie } from '@/shared/utils/cookie-actions'

const { t } = useI18n()

const value = ref<boolean>(false)

const chosenLanguage = getCookie('locale') || 'en'
const isLanguageChanged = ref<boolean>(false)

const languages = [
  {
    text: 'Русский (Russian)',
    value: 'ru',
  },
  {
    text: 'English (English)',
    value: 'en',
  },
]

function onLanguageChanged(event: Event) {
  const value = (event.target as HTMLSelectElement).value

  setCookie('locale', value, 365)

  isLanguageChanged.value = true
}

function reloadPage() {
  location.reload()
}
</script>

<template>
  <div class="preferences">
    <div class="heading">
      <h1 class="heading-text">
        {{ t('preferences.settings') }}
      </h1>
      <div class="search" />
    </div>

    <div class="controls-wrapper">
      <PreferencesControl>
        <template #name>
          {{ t('preferences.account') }}
        </template>

        <template #section>
          <PreferencesControlSection>
            <template #description>
              {{ t('preferences.accountDescription') }}
            </template>
            <template #action>
              <BubbleButton design="border" class="change-account-preferences">
                {{ t('preferences.accountEditButton') }}

                <OutsideLinkIcon class="icon" />
              </BubbleButton>
            </template>
          </PreferencesControlSection>
        </template>
      </PreferencesControl>

      <PreferencesControl>
        <template #name>
          {{ t('preferences.language') }}
        </template>

        <template #section>
          <PreferencesControlSection>
            <template #description>
              {{ t('preferences.languageDescription') }}
            </template>

            <template #action>
              <select class="change-language" @change="onLanguageChanged($event)">
                <option
                  v-for="(language, index) in languages"
                  :key="index"
                  :value="language.value"
                  :selected="chosenLanguage === language.value"
                >
                  {{ language.text }}
                </option>
              </select>
            </template>
          </PreferencesControlSection>
        </template>
      </PreferencesControl>

      <div>
        <BubbleButton
          v-if="isLanguageChanged"
          class="reload-button"
          design="border"
          @click="reloadPage()"
        >
          {{ t('preferences.reload') }}
        </BubbleButton>
      </div>

      <PreferencesControl>
        <template #name>
          {{ t('preferences.social') }}
        </template>

        <template #section>
          <PreferencesControlSection>
            <template #description>
              {{ t('preferences.socialDescription') }}
            </template>

            <template #action>
              <BaseIosCheckbox v-model="value" @click="value = !value" />
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
      border-radius: 500px;

      .icon {
        width: 16px;
        height: 16px;
        fill: var(--white);
      }
    }

    .reload-button {
      padding: 16px 32px;
      font-size: 1rem;
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
