<script setup lang="ts">
import EntityCard from "@/UI/Elements/EntityCard.vue";
</script>

<template>
  <div class="layout">
    <section class="top-result">
      <div class="best-result">
        <div class="title">
          Лучший результат
        </div>
        <EntityCard
          :id="1"
          name="asd"
          :image="null"
          :artists="[{id: 3, name: 'Moldanazar', avatar: '', type: 'Artist'}]"
          type="Artist"
        />
      </div>
      <div class="other" />
    </section>
  </div>
</template>

<style scoped lang="scss">
.layout {
  gap: 32px 12px;
  margin-top: 45px;
  padding: 0 var(--content-spacing);
  width: 100%;

  .top-result {
    display: flex;
    width: 100%;
    container: top-results / inline-size;

    .best-result {
      width: 35%;
      height: 230px;

      @container top-results (max-width: 1000px) {
        & {
          width: 50%;
        }
      }

      .title {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 12px;
      }
    }
  }
}
</style>