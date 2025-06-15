<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'

import { useRoute } from 'vue-router'
import { router } from '@/app/router'
import useDebounce from '@/shared/composables/useDebounce'
import CloseIcon from '@/shared/UI/Icons/CloseIcon.vue'
import SearchIcon from '@/shared/UI/Icons/SearchIcon.vue'

import SearchReviewIcon from '@/shared/UI/Icons/SearchReviewIcon.vue'

const { t } = useI18n()

const route = useRoute('/search/[...query]/[...path]')
const input = useTemplateRef<HTMLInputElement>('input')
const inputValue = ref<string>('')

function onSearchClick() {
  if (inputValue.value) {
    router.push(`/search/${inputValue.value}`)
  }
  else if (!route.fullPath.startsWith('/search')) {
    router.push('/search')
  }

  input.value!.focus()
}

const { debounce, clear } = useDebounce()

onMounted(() => {
  if (route.fullPath.startsWith('/search/') && route.params.query) {
    inputValue.value = route.params.query
  }
})

function onInput(value: string) {
  if (!value) {
    clear()
    router.push('/search')
    return
  }

  debounce(() => {
    const path = route.params.path ? `/${route.params.path}` : ''
    router.push(`/search/${encodeURIComponent(value)}${path}`)
  }, 1000)
}

function clearAll() {
  router.push('/search')
  inputValue.value = ''
}

router.afterEach((to) => {
  if (to.path.startsWith('/search/') && route.params.query) {
    inputValue.value = route.params.query
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
      :placeholder="t('app-header.searchBarPlaceholder')"
      @input="onInput(($event.target as HTMLInputElement).value)"
    >
    <div class="icon-container-search">
      <SearchIcon class="icon" />
    </div>

    <div
      v-if="!inputValue?.length"
      v-tooltip="{
        content: t('app-header.tooltip.browse'),
        distance: 5,
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
      v-tooltip="t('app-header.tooltip.clear')"
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
