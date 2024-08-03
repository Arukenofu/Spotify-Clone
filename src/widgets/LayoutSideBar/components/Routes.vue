<script setup lang="ts">
import useSidebarStore from "@/widgets/LayoutSideBar/store/useSidebarStore";
import {storeToRefs} from "pinia";
import HomeIcon from "@/widgets/LayoutSideBar/UI/Icons/HomeIcon.vue";
import SearchIcon from "@/widgets/LayoutSideBar/UI/Icons/SearchIcon.vue";
import Link from "@/widgets/LayoutSideBar/UI/Button/Link.vue";

const store = useSidebarStore();
const {isMinimized} = storeToRefs(store);
</script>

<template>
  <nav class="routes">
    <ul>
      <Link :icon="HomeIcon" to="/" :is-minimized="isMinimized">
        Главная
      </Link>
      <Link :icon="SearchIcon" to="/search" :is-minimized="isMinimized">
        Поиск
      </Link>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  background-color: var(--ui);
  border-radius: var(--border-radius);

  ul {
    padding: 8px 12px;
    list-style: none;
  }
}
</style>