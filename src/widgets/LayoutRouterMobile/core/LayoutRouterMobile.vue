<script setup lang="ts">
import useCurrentRoutePath from '@/shared/composables/useCurrentRoutePath'
import HomeIcon from '@/shared/UI/Icons/HomeIcon.vue'
import LibraryIcon from '@/shared/UI/Icons/LibraryIcon.vue'
import Logo from '@/shared/UI/Icons/Logo.vue'
import SearchIcon from '@/shared/UI/Icons/SearchIcon.vue'
import LinkButton from '@/widgets/LayoutRouterMobile/components/LinkButton.vue'

const { currentRoutePath } = useCurrentRoutePath('path')

const routes = [
  {
    path: '/',
    text: 'Главная',
    icon: HomeIcon,
  },
  {
    path: '/search',
    text: 'Поиск',
    icon: SearchIcon,
  },
  {
    path: '/library',
    text: 'Моя медиатека',
    icon: LibraryIcon,
  },
  {
    path: '/download',
    text: 'Скачать приложение',
    icon: Logo,
  },
]
</script>

<template>
  <div class="mobile-router">
    <LinkButton
      v-for="route in routes"
      :key="route.path"
      :component="route.icon"
      :active="route.path === currentRoutePath"
      @click="$router.push(route.path)"
    >
      {{ route.text }}
    </LinkButton>
  </div>
</template>

<style lang="scss" scoped>
.mobile-router {
  position: fixed;
  bottom: 0;
  height: var(--mobile-router-height);
  width: 100%;
  background-color: var(--black);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
</style>
