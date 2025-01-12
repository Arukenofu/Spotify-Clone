<script setup lang="ts">

import {useI18n} from "vue-i18n";

interface Links {
  text: string;
  url: string;
}

const {t} = useI18n();

const links: Links[] = [
  {
    text: t('app-footer.client'),
    url: 'https://github.com/Arukenofu/Spotify-Clone'
  },
  {
    text: t('app-footer.original'),
    url: 'https://open.spotify.com/'
  },
  {
    text: 'Arukenofu',
    url: 'https://github.com/Arukenofu'
  },
  {
    text: t('app-footer.license'),
    url: 'https://github.com/Arukenofu/Spotify-Clone/blob/master/LICENSE'
  }
]

</script>

<template>
  <footer class="page-footer">
    <hr class="horizontal-rule" />

    <div class="container">
      <div class="items">
        <div 
          v-for="link in links"
          :key="link.text"
          class="item"
        >
          <a :href="link.url" target="_blank">
            {{link.text}}
          </a>
        </div>
      </div>
      <div class="right">
        © 2024 Spotify AB
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.page-footer {
  padding: 8px 16px 40px;

  .horizontal-rule {
    border: none;
    border-block-start: 1px solid #292929;
    margin-block: 24px;
  }

  .container {
    display: flex;
    justify-content: space-between;
    padding-top: 16px;

    .items {
      display: flex;
      flex-wrap: wrap;

      .item {
        margin-right: 16px;
        margin-bottom: 8px;

        a {
          font-size: .875rem;
          font-weight: 500;
          color: var(--text-soft);

          &:hover {
            color: var(--white);
          }
        }
      }
    }

    .right {
      display: flex;
      flex: 0 0 auto;
      color: var(--text-soft);
      font-size: .875rem;
      font-weight: 500;
    }
  }
  
  @media (min-width: 992px) {
    padding-left: 32px;
    padding-right: 32px;
  }
}
</style>