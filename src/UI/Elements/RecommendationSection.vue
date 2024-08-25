<script setup lang="ts">
interface Props {
  naming: string,
  href: string,
  isShowAll?: boolean,
}

withDefaults(defineProps<Props>(), {
  isShowAll: true
})

</script>

<template>
  <section class="">
    <div class="head-area">
      <RouterLink :to="href">
        {{naming}}
      </RouterLink>

      <div class="show-all" v-if="isShowAll">
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
    margin-bottom: 21px;

    & > a {
      margin-top: auto;
      display: -webkit-box;
      overflow: hidden;
      -moz-box-orient: vertical;
      -webkit-line-clamp: 1;
      line-clamp: 1;
      user-select: none;
      font-size: 1.5rem;
      font-weight: 900;
      text-wrap: balance;
      align-items: flex-end;

      &:hover {
        text-decoration: underline;
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