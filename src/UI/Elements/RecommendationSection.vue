<script setup lang="ts">

import useResponsive from "@/shared/composables/useResponsive";

interface Props {
  naming?: string,
  headTitle?: string
  href: string,
  isShowAll?: boolean,
}

withDefaults(defineProps<Props>(), {
  isShowAll: true
});

const {isMobile} = useResponsive();

</script>

<template>
  <section class="">
    <div class="head-area" v-if="naming">
      <div class="title">
        <p>
          {{headTitle}}
        </p>

        <RouterLink :to="!isMobile ? href : ''">
          {{naming}}
        </RouterLink>
      </div>

      <div class="show-all" v-if="isShowAll && !isMobile">
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
      & {height: 40px}
    }

    .title {
      margin-top: auto;
      display: grid;
      gap: 7px;
      font-size: 1rem;

      @media screen and (max-width: 768px) {
        font-size: .75rem;
      }

      p {
        font-size: .75em;
        color: var(--text-soft);
      }

      a {
        display: -webkit-box;
        overflow: hidden;
        -moz-box-orient: vertical;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        user-select: none;
        font-size: 1.5em;
        font-weight: 900;
        text-wrap: balance;
        align-items: flex-end;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .show-all {
      margin-top: auto;

      a {
        font-weight: 900;
        font-size: .875rem;
        color: var(--text-soft);
        white-space: nowrap;
      }

      &:hover a {
        text-decoration: underline;
      }
    }
  }

  .main-area {
    --rec-min-column-width: 160px;
    margin-inline: -12px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--rec-min-column-width), 1fr));
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
    --rec-min-column-width: 210px !important;
  }
}
</style>