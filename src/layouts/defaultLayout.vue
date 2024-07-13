<script setup lang="ts">
import Icon from "@/components/Icon.vue";
</script>

<template>
  <div class="page">
    <nav>
      <div class="logo">
        <img src="/logo.png" alt="">
      </div>

      <router-link to="/">
        <Icon>
          home
        </Icon>
      </router-link>

      <router-link to="/search">
        <Icon>
          explore
        </Icon>
      </router-link>

      <router-link to="/favorite">
        <Icon>
          favorite
        </Icon>
      </router-link>

      <router-link to="/playlists">
        <Icon>
          playlist_play
        </Icon>
      </router-link>

      <router-link to="/user">
        <Icon>
          person
        </Icon>
      </router-link>

      <router-link to="/settings">
        <Icon>
          more_horiz
        </Icon>
      </router-link>
    </nav>

    <main>
      <slot />
    </main>

  </div>
</template>

<style lang="scss" scoped>

.page {
  display: flex;

  nav {
    top: 0;
    left: 0;
    position: sticky;
    display: flex;
    flex-direction: column;
    height: 100dvh;
    overflow: hidden;
    width: 100px;

    .logo {
      display: flex;
      align-items: center;
      aspect-ratio: 1/1;
      margin: 0 auto;
      width: 100%;
      padding-top: 7px;

      img {
        margin: 0 auto;
        height: 39px
      }
    }

    a {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      width: 80%;
      aspect-ratio: 1/0.85;
    }

    .material-symbols-rounded {
      font-size: 1.7rem;
      color: rgb(128, 128, 128);
    }

    .router-link-active span {
      color: #FFFFFF;
    }
  }

  main {
    width: calc(100dvw - 100px);
    padding: 12px;
  }
}

</style>