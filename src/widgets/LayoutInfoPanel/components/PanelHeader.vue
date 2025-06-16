<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Tippy } from 'vue-tippy'
import useInfoContentStore from '@/features/InfoPanel/store/useInfoContentStore'
import RoundButton from '@/shared/UI/Buttons/RoundButton.vue'
import CloseIconRound from '@/shared/UI/Icons/CloseIconRound.vue'

const { t } = useI18n()

const { removePanel } = useInfoContentStore()
</script>

<template>
  <div class="head">
    <span class="panel-name">
      <slot name="name" />
    </span>

    <div class="panel-options">
      <slot name="options" />

      <Tippy :content="t('info-panel.close')">
        <RoundButton @click="removePanel()">
          <CloseIconRound class="icon" />
        </RoundButton>
      </Tippy>
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
