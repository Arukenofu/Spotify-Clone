<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ClockIcon from '@/shared/UI/Icons/ClockIcon.vue'

const { t } = useI18n()
</script>

<template>
  <div class="v-music-row-header">
    <div class="index">
      #
    </div>
    <div class="name">
      {{ t('music-table.naming') }}
    </div>
    <div v-if="$slots.var1" class="var1">
      <slot name="var1" />
    </div>
    <div v-if="$slots.var2" class="var2">
      <slot name="var2" />
    </div>
    <div v-if="$slots.var3" class="var3">
      <slot name="var3" />
    </div>
    <div class="time">
      <div v-tooltip="t('music-table.duration')">
        <ClockIcon class="icon" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.v-music-row-header {
  width: 100%;
  max-width: var(--content-max-width);
  height: 36px;
  margin: 0 auto;
  padding: 0 calc(var(--content-spacing) + 16px);
  display: grid;
  grid-gap: 16px;
  grid-template-rows: auto;
  z-index: 3  ;

  & > div {
    height: 100%;
    display: flex;
    align-items: center;
    color: var(--text-soft);
    font-size: 0.875rem;
    font-weight: 500;

    &:first-child {
      justify-self: end;
      font-size: 1rem;
    }

    & > div {
      margin-left: auto;
      margin-right: 32px;

      .icon {
        width: 16px;
        height: 16px;
        fill: var(--text-soft);
      }
    }
  }

  $classes: (
      'index' : 'index',
      'name' : 'main',
      'var1' : 'var1',
      'var2' : 'var2',
      'var3': 'var3',
      'time' : 'time'
  );

  @each $class, $line in $classes {
    .#{$class} {
      grid-column: #{$line};
    }
  }
}
</style>
