<script setup lang="ts">
import CloseIconRound from '@/shared/UI/Icons/CloseIconRound.vue';
import RoundButton from '@/shared/UI/Buttons/RoundButton.vue';
import useInfoContentStore from '@/features/InfoPanel/store/useInfoContentStore';
import {useI18n} from "vue-i18n";

const {t} = useI18n();

const { removePanel } = useInfoContentStore();
</script>

<template>
  <div class="head">
    <span class="panel-name">
      <slot name="name" />
    </span>

    <div class="panel-options">
      <slot name="options" />

      <RoundButton
        v-tooltip="t('info-panel.close')"
        @click="removePanel()"
      >
        <CloseIconRound class="icon" />
      </RoundButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.head {
  height: var(--info-panel-header-height);
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;

  .panel-name {
    font-size: 1rem;
    font-weight: 800;
  }
  .panel-options {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .icon {
    width: 16px;
    height: 16px;
    fill: var(--text-soft);
  }
}
</style>
