<script setup lang="ts">
import FormButton from "@/UI/Form/FormButton.vue";
import FormField from "@/shared/components/FormField.vue";
import FormLabel from "@/UI/Form/FormLabel.vue";

const step = defineModel<number>('step', {
  required: true
});

</script>

<template>
  <div class="face">
    <h1>
      Зарегистрируйтесь и погрузитесь в музыку
    </h1>

    <form @submit.prevent="step++">
      <FormLabel>Электронная почта</FormLabel>

      <FormField class="input" type="email" placeholder="example@domain.com">
        Неверный адрес электронной почты.<br>
        Проверьте, нет ли опечаток, и попробуйте еще раз.
      </FormField>

      <FormButton class="button">
        Далее
      </FormButton>
    </form>
  </div>
</template>

<style scoped>
.face {
  width: 100%;

  h1 {
    margin-top: 12px;
    text-align: center;
    font-weight: 800;
    font-size: 3rem;
    line-height: 1.4;
    word-break: break-word;
    margin-bottom: 35px;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .button {
    margin-top: 21px;
  }
}
</style>