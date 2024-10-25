<script setup lang="ts">
import { ref } from 'vue';

import SearchIcon from '@/UI/Icons/Shared/SearchIcon.vue';
import RoundButton from '@/UI/Buttons/RoundButton.vue';
import CloseIconRound from '@/UI/Icons/Shared/CloseIconRound.vue';

const state = ref<boolean>(false);
const input = ref<HTMLInputElement>();

const model = defineModel<string>({
  required: true
});

function handleToggle() {
  state.value = !state.value;

  if (state.value) {
    input.value?.focus();
  }
}

function handleClose() {
  state.value = false;
  model.value = '';
}

function onClickOutside() {
  if (model.value.length && !state.value) {
    return;
  }

  state.value = false;
}
</script>

<template>
  <div class="search-section">
    <RoundButton
      v-tooltip="'Искать в медиатеке'"
      v-click-outside="onClickOutside"
      class="searchButton"
      @click="handleToggle()"
    >
      <SearchIcon class="searchIcon" />
    </RoundButton>

    <input
      ref="input"
      v-model="model"
      :class="state && 'active'"
      placeholder="Искать в медиатеке"
    >

    <CloseIconRound
      v-if="state && model.length"
      class="icon"
      @click="handleClose()"
    />
  </div>
</template>

<style lang="scss" scoped>
.search-section {
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  margin-right: 15px;

  &:has(.active) {
    width: 188px;
    min-width: 188px;
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition-duration: 0.3s;
    transition-property: opacity, width, padding, background-color;
    transition-timing-function: cubic-bezier(0.3, 0, 0.4, 1);
    border-radius: 4px;
    border: none;
    outline: none;
    color: var(--text-soft);
    font-size: 0.8rem;
    background-color: var(--ui);
    max-width: 0;
    padding: 0;
    opacity: 0;
  }

  .active {
    background-color: hsla(0, 0%, 100%, 0.1);
    padding: 4px 32px;
    opacity: 1;
    max-width: 188px !important;
  }

  .searchButton {
    &:hover .searchIcon {
      fill: var(--white);
    }

    &:active {
      background-color: var(--ui-highlight) !important;
    }

    .searchIcon {
      width: 16px;
      height: 16px;
      fill: var(--text-soft);
    }
  }

  .icon {
    fill: var(--text-soft);
    width: 32px;
    height: 32px;
    scale: 0.5;
  }
}
</style>
