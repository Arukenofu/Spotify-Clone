<script setup lang="ts">
import FormCheckbox from "@/UI/Form/FormCheckbox.vue";
import FormButton from "@/UI/Form/FormButton.vue";
import {ref} from "vue";
import FormError from "@/UI/Form/FormError.vue";
import {router} from "@/router";

const terms = ref([
  {
    text: 'Я не хочу получать рекламные сообщения от Spotify.',
    checked: false
  },
  {
    text: 'Я разрешаю сообщить мои регистрационные данные партнерам Spotify в целях рекламы.',
    checked: false
  },
  {
    text: 'Я принимаю Условия использования и Политику конфиденциальности Spotify.',
    checked: false
  }
]);
const isError = ref<boolean>(false)

function validateWholeForm() {
  if (!terms.value[0].checked) {
    // do something
  }
  if (!terms.value[1].checked) {
    // do something
  }
  if (!terms.value[2].checked) {
    return isError.value = true;
  }

  router.push('/login');
}

</script>

<template>
  <form @submit.prevent="validateWholeForm()">
    <div
        class="term"
        v-for="term in terms"
        :key="term.text"
        @click="term.checked =! term.checked"
    >
      <div class="check">
        <FormCheckbox v-model="term.checked" />
      </div>
      <div class="text">
        {{term.text}}
      </div>
    </div>

    <FormError class="error" v-if="isError">
      Чтобы продолжить, примите Условия использования.
    </FormError>

    <FormButton class="button">
      Зарегистрироваться
    </FormButton>
  </form>
</template>

<style scoped>
form {
  display: grid;
  gap: 8px;

  .term {
    background-color: #232323;
    display: flex;
    padding: 21px 15px;
    gap: 12px;
    border-radius: 6px;
    cursor: initial;

    .text {
      position: relative;
      bottom: 4px;
      font-size: .9rem;
      line-height: 1.4;
    }
  }

  .error {
    margin-top: 3px;
  }

  .button {
    margin-top: 28px;
  }
}


</style>