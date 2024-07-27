<script setup lang="ts">
import months from "@/modules/SignUp/constants/months";
import FormLabel from "@/UI/Form/FormLabel.vue";
import FormInput from "@/UI/Form/FormInput.vue";
import FormSelect from "@/UI/Form/FormSelect.vue";
import FormField from "@/shared/components/FormField.vue";

const step = defineModel<number>('step', {
  required: true
});


</script>

<template>
  <form @submit.prevent="step++">

    <FormLabel margin="0 0 3px">
      Название
    </FormLabel>
    <FormLabel color="var(--text-soft)" font-size=".85rem" font-weight="600">
      Ваше имя появится в профиле.
    </FormLabel>
    <FormField type="text" :error="true">
      Укажите имя своего профиля.
    </FormField>

    <FormLabel margin="18px 0 0">
      Дата рождения
    </FormLabel>

    <div class="inputs">
      <FormInput
          class="day"
          type="text"
          maxLength="2"
          :only-number="true"
          placeholder="дд"
      />

      <FormSelect text="Месяц" class="month">
        <option v-for="month in months" :key="month">
          {{month}}
        </option>
      </FormSelect>

      <FormInput
          class="year"
          maxLength="4"
          :only-number="true"
          placeholder="гггг"
      />
    </div>


  </form>
</template>

<style scoped>
form {

  .inputs {
    margin-top: 9px;
    display: flex;
    gap: 8px;

    .day {
      width: 20%;
    }

    .month {
      flex: 1;
    }

    .year {
      width: 30%;
    }

  }

}
</style>