<script setup lang="ts">
import CloseIconRound from '@/UI/Icons/Shared/CloseIconRound.vue';
import RoundButton from '@/UI/Buttons/RoundButton.vue';
import useInfoContentStore from '@/features/InfoPanel/store/useInfoContentStore';

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
        v-tooltip:end_top="'Закрыть'"
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
  }
  .icon {
    width: 16px;
    height: 16px;
    fill: var(--text-soft);
  }
}
</style>
