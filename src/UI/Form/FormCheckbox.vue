<script setup lang="ts">
const model = defineModel<boolean>();
</script>

<template>
  <div class="checkbox">
    <input type="checkbox" v-model="model" />

    <div class="indicator"></div>
  </div>
</template>

<style scoped>
.checkbox {
  position: relative;

  input {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
  }

  .indicator {
    width: 16px;
    height: 16px;
    border-radius: 3px;
    position: relative;
  }

  input:not(:checked) + .indicator {
    border: 1px solid #727272;
    background-color: var(--ui);

    &:hover {
      border: 1px solid var(--main-color);
    }
  }

  input:checked + .indicator {
    background-color: var(--main-color);
    border: none;

    &::before {
      box-sizing: border-box;
      background-color: unset;
      border-bottom-width: 2px;
      border-bottom-style: solid;
      border-left-width: 2px;
      border-left-style: solid;
      border-color: var(--ui);
      display: block;
      content: '';
      block-size: 5px;
      inline-size: 9px;
      position: absolute;
      top: 46%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0px) rotate(-48deg);
    }
  }
}
</style>
