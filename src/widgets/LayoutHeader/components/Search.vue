<script setup lang="ts">
import {onMounted, ref, useTemplateRef} from 'vue';
import {useRoute} from 'vue-router';

import SearchReviewIcon from '@/UI/Icons/Shared/SearchReviewIcon.vue';
import SearchIcon from '@/UI/Icons/Shared/SearchIcon.vue';
import CloseIcon from '@/UI/Icons/Shared/CloseIcon.vue';

import useDebounce from '@/shared/composables/useDebounce';
import {router} from '@/app/router';

const route = useRoute('/search/[...query]/[...path]');
const input = useTemplateRef('input');
const inputValue = ref<string>('');

function onSearchClick() {
  if (!route.fullPath.startsWith('/search')) {
    router.push('/search');
  }

  input.value!.focus();
}

const {debounce, clear} = useDebounce();

onMounted(() => {
  if (route.fullPath.startsWith('/search/') && route.params.query) {
    inputValue.value = route.params.query;
  }
})

function onInput(value: string) {
  if (!value) {
    clear();
    router.push('/search');
    return;
  }

  debounce(() => {
    const path = route.params.path ? `/${route.params.path}` : '';

    router.push(`/search/${value}${path}`);
  }, 1000);
}

function clearAll() {
  router.push('/search');
  inputValue.value = '';
}

router.beforeEach((to, from) => {
  if (from.path.startsWith('/search') && !to.path.startsWith('/search')) {
    inputValue.value = '';
    clear();
  }
})
</script>

<template>
  <div
    class="searchSection"
    @click="onSearchClick()"
  >
    <input
      ref="input"
      v-model="inputValue"
      type="text"
      placeholder="Что хочешь включить?"
      @keyup="onSearchClick()"
      @input="onInput(($event.target as HTMLInputElement).value)"
    >
    <div class="icon-container-search">
      <SearchIcon class="icon" />
    </div>

    <div
      v-if="!inputValue?.length"
      v-tooltip="{
        content: 'Обзор',
        distance: 5
      }"
      class="icon-container-box"
    >
      <SearchReviewIcon
        :style="route.path === '/search' && 'fill: var(--white)'"
        :state="route.path === '/search'"
        class="icon"
      />
    </div>

    <div
      v-else
      v-tooltip="'Очистить строку поиска'"
      class="icon-container-delete"
      @click="clearAll()"
    >
      <CloseIcon class="icon" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.searchSection {
  margin: 0 8px;
  height: 100%;
  min-width: 320px;
  width: 100%;
  max-width: 480px;
  background-color: var(--ui-highlight);
  border-radius: 500px;
  display: flex;
  align-items: center;
  position: relative;
  transition: all 0.22s ease-in;
  cursor: pointer;

  &:hover {
    background-color: #2a2a2a;
    box-shadow: inset 0 0 0 1.5px #3f3f3f;

    .icon-container-search .icon {
      fill: var(--white);
    }
  }

  .icon-container-search {
    position: absolute;
    left: 0;
    height: 100%;
    aspect-ratio: 1/1;
    display: grid;
    place-items: center;

    &:hover,
    &:active {
      .icon {
        fill: var(--white);
      }
    }
  }

  .icon-container-box {
    position: absolute;
    right: 0;
    height: 100%;
    width: calc(48px + 24px);
    display: grid;
    place-items: center;
    margin-left: auto;

    &:hover,
    &:active {
      .icon {
        fill: var(--white);
        scale: 1.02;
      }
    }

    .icon {
      border-left: 1px solid #7c7c7c;
      padding-left: 12px;
      width: unset;
    }
  }

  .icon-container-delete {
    position: absolute;
    right: 6px;
    display: grid;
    place-items: center;
    height: 100%;
    aspect-ratio: 1/1;

    &:hover .icon {
      fill: var(--white);
    }
  }

  .search-underlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  input {
    position: absolute;
    height: 100%;
    width: 100%;
    border-radius: 500px;
    padding: 0 48px;
    background: none;
    border: none;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.1s ease-in;

    &::placeholder {
      color: var(--text-soft);
      opacity: 1;
    }

    &:focus {
      outline: none;
      box-shadow: inset 0 0 0 2px var(--white);
      background-color: #2a2a2a;
      cursor: text;
    }
  }
}

.icon {
  height: 24px;
  width: 24px;
  fill: var(--text-soft);
  cursor: pointer;
}
</style>
