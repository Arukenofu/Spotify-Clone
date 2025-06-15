<script setup lang="ts">
defineEmits<{
  onCancel: []
  onConfirm: []
}>()
</script>

<template>
  <Transition name="content" appear>
    <div class="content">
      <h1><slot name="title" /></h1>
      <p v-if="$slots.body">
        <slot name="body" />
      </p>

      <div class="controls">
        <button class="cancel" @click="$emit('onCancel')">
          <slot name="cancel">
            Отмена
          </slot>
        </button>
        <button class="confirm" @click="$emit('onConfirm'); $emit('onCancel')">
          <slot name="confirm">
            Удалить
          </slot>
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.content {
  width: 420px;
  padding: 32px;
  border-radius: 8px;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  gap: 8px;

  h1, p {
    color: var(--black);
  }
  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.2;
  }
  p {
    font-size: .875rem;
    font-weight: 500;
    line-height: 1.5;
  }

  .controls {
    margin-top: 24px;
    display: flex;
    width: 100%;
    gap: 16px;
    justify-content: flex-end;

    button {
      height: 48px;
      font-size: 1rem;
      font-weight: 700;
      border-radius: 500px;
      text-align: center;
      color: var(--black);
      transition-duration: 33ms;
      transition-property: background-color, border-color, color, box-shadow, filter, transform;
      background-color: transparent;
      border: none;
      padding: 0 32px;
      cursor: pointer;

      &:hover {
        transform: scale(1.04);
      }
    }

    .confirm {
      background-color: var(--main-color) !important;
    }
  }
}

.content-enter-from, .content-leave-to {
  transform: translateY(-20px);
}
.content-enter-to, .content-leave-from {
  transform: translateY(0);
}
.content-enter-active, .content-leave-active {
  transition: opacity .3s linear,transform .3s ease-out;
}
</style>
