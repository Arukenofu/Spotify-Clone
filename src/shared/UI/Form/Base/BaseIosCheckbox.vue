<script setup lang="ts">
const model = defineModel<boolean>()
</script>

<template>
  <div class="v-checkbox">
    <input v-model="model" type="checkbox">
    <span class="indicator">
      <span class="thumb" />
    </span>
  </div>
</template>

<style scoped lang="scss">
.v-checkbox {
  display: inline-flex;
  align-items: center;
  position: relative;
  height: min-content;

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

  &:hover {
    input:checked ~ .indicator {
      background-color: #1ed760;
    }
    input:not(:checked) ~ .indicator {
      background-color: #b3b3b3;
    }
  }

  input:checked ~ .indicator {
    background-color: var(--main-color);

    .thumb {
      right: 2px;
    }
  }

  input:not(:checked) ~ .indicator {
    background-color: #535353;

    .thumb {
      left: 2px;
    }
  }

  .indicator {
    height: 24px;
    width: 42px;
    border-radius: 500px;
    position: relative;

    .thumb {
      top: 2px;
      position: absolute;
      width: 20px;
      height: 20px;
      background-color: var(--white);
      border-radius: 50%;
    }
  }
}
</style>
