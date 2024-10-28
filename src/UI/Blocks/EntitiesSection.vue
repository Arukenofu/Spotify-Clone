<script setup lang="ts">
import useResponsive from '@/shared/composables/useResponsive';

interface Props {
  naming: string | null;
  headTitle?: string | null;
  href: string | null;
  isShowAll?: boolean;
  columnWidth?: string;
}

const {isShowAll = true, columnWidth = '160px'} = defineProps<Props>();

const { isMobile } = useResponsive();
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
          Показать все
        </RouterLink>
      </div>
    </div>

    <div class="main-area">
      <slot />
    </div>
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
        font-family: var(--title-font);
        font-size: 1.5em;
        font-weight: 500;
        text-wrap: balance;
        align-items: flex-end;
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

  .main-area {
    --col-width: v-bind(columnWidth);
    margin-inline: -12px;
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(var(--col-width), 1fr)
    );
    grid-template-rows: 1fr 0 0 0 0 0;
    overflow: hidden;
    grid-auto-rows: min-content;

    .item {
      grid-row: 1;
    }
  }
}

@container recommendation (min-width: 1205px) {
  .main-area {
    --col-width: 210px !important;
  }
}
</style>
