<script setup lang="ts">
import BricksIcon from "@/widgets/LayoutSideBar/UI/Icons/Format/BricksIcon.vue";

const sortTypes = [
    'Недавно прослушано',
    'Недавно добавленные',
    'По алфавиту',
    'По автору',
    'Свой порядок'
]

</script>

<template>
  <button class="format">
    <span class="text">
      {{sortTypes[0]}}
    </span>

    <span class="icon">
      <BricksIcon />
    </span>
  </button>
</template>

<style lang="scss" scoped>

.format {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  position: relative;
  opacity: 1;
  transition: opacity .1s;

  &:hover {
    transform: scale(1.04);
    transform-origin: center;

    .text {
      color: var(--white);
    }

    .icon {
      fill: var(--white);
    }
  }

  &:active {
    transform: scale(1);
    opacity: .5;
  }

  .text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--text-soft);
    font-size: .85rem;
    font-weight: 600;
  }

  .icon {
    margin-left: 5px;
    width: 16px;
    height: 16px;
    fill: var(--text-soft);

    svg {
      width: 100%;
      height: 100%;
    }
  }
}

</style>