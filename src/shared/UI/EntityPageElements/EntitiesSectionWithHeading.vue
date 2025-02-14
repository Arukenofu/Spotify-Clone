<script setup lang="ts">
import useResponsive from '@/shared/composables/useResponsive';
import EntitiesSectionWrapper from "@/shared/UI/EntityPageElements/EntitiesSectionWrapper.vue";
import {useI18n} from "vue-i18n";

interface Props {
  naming: string | null;
  headTitle?: string | null;
  href: string | null;
  isShowAll?: boolean;
  isScrollable?: boolean;
}

const {isShowAll = true, isScrollable = true} = defineProps<Props>();

const { isMobile } = useResponsive();
const {t} = useI18n();
</script>

<template>
  <section class="">
    <div
      v-if="naming"
      class="head-area"
    >
      <div class="title">
        <p>
          {{ headTitle }}
        </p>

        <RouterLink v-if="href" class="naming" :to="!isMobile ? href : ''">
          {{ naming }}
        </RouterLink>

        <span v-else class="naming">
          {{ naming }}
        </span>
      </div>

      <div
        v-if="href && isShowAll && !isMobile"
        class="show-all"
      >
        <RouterLink :to="href">
          {{t('entities-section.showAll')}}
        </RouterLink>
      </div>
    </div>

    <EntitiesSectionWrapper :is-scrollable="isScrollable">
      <slot />
    </EntitiesSectionWrapper>
  </section>
</template>

<style lang="scss" scoped>
section {
  container: recommendation / inline-size;

  .head-area {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;

    @media screen and (max-width: 768px) {
      & {
        height: 40px;
      }
    }

    .title {
      margin-top: auto;
      display: grid;
      gap: 7px;
      font-size: 1rem;

      @media screen and (max-width: 768px) {
        font-size: 0.75rem;
      }

      p {
        font-size: 0.75em;
        color: var(--text-soft);
      }

      .naming {
        display: -webkit-box;
        overflow: hidden;
        -moz-box-orient: vertical;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        user-select: none;
        font-size: 1.5em;
        font-weight: 600;
        text-wrap: balance;
        align-items: flex-end;
        line-height: 1.375;
      }

      a {
        &:hover {
          text-decoration: underline;
        }
      }
    }

    .show-all {
      margin-top: auto;

      a {
        font-weight: 500;
        font-size: 0.875rem;
        color: var(--white);
        white-space: nowrap;
      }

      &:hover a {
        text-decoration: underline;
      }
    }
  }
}

@container recommendation (min-width: 1205px) {
  .main-area {
    --col-width: 210px !important;
  }
}
</style>
