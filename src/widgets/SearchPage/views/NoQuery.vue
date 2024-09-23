<script setup lang="ts">

</script>

<template>
  <div class="layout" >
    <h1 class="title">
      Всё остальное
    </h1>

    <div class="cards">
      <RouterLink
          class="card"
          v-for="a in 20"
          :key="a"
          :to="`/genre/${a}`"
      >
        <div class="name">
          Музыка
        </div>

        <img class="image" src="https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb" alt="img" />
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  padding: 0 var(--content-spacing);

  .title {
    margin-top: 24px;
    margin-bottom: 24px;
    font-weight: 900;
    width: 100%;
  }

  .cards {
    display: grid;
    grid-gap: 24px;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

    .card {
      display: block;
      aspect-ratio: 16/9;
      background-color: #45dc60;
      border-radius: 9px;
      position: relative;
      overflow: hidden;

      .name {
        font-weight: 900;
        font-size: 1.5rem;
        padding: 16px;
      }

      .image {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 45%;
        transform: rotate(25deg) translate(18%,-2%);;
        border-radius: 4px;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
        z-index: 1;
      }
    }
  }
}
</style>