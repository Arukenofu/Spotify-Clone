<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface Props {
  naming: string
  prefix?: string
  postfix?: string
  showExpanded?: boolean
}
withDefaults(defineProps<Props>(), {
  showExpanded: true,
})

const isExpanded = defineModel<boolean>('isExpanded', {
  required: false,
  default: null,
})

const { t } = useI18n()
</script>

<template>
  <section class="v-tracks-section">
    <div class="heading">
      <span v-if="prefix" class="span">{{ prefix }}</span>
      <h2 class="naming">
        {{ naming }}
      </h2>
      <span v-if="postfix" class="span">{{ postfix }}</span>
    </div>
    <div class="wrapper">
      <slot />
    </div>
    <button v-if="showExpanded" class="expand" @click="isExpanded = !isExpanded">
      {{ isExpanded ? t('music-table.showLess') : t('music-table.seeMore') }}
    </button>
  </section>
</template>

<style scoped lang="scss">
.v-tracks-section {
  display: grid;
  grid-template-columns: 1fr;

  .heading {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
    gap: 6px;

    .naming {
      font-size: 1.5rem;
      font-weight: 700;
      width: 100%;
    }

    .span {
      font-size: .875rem;
      font-weight: 400;
      color: hsla(0,0%,100%,.7);
    }
  }

  .expand {
    width: min-content;
    padding: 16px;
    background: transparent;
    border: none;
    font-weight: 700;
    font-size: .875rem;
    color: hsla(0,0%,100%,.7);
    white-space: nowrap;

    &:hover {
      color: var(--white);
    }
  }
}
</style>
