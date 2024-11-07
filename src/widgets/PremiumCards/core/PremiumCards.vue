<script setup lang="ts">
import PremiumCard from '../components/PremiumCard.vue';
import plans from '../constants/plans';
</script>

<template>
  <section class="plans">
    <PremiumCard
      v-for="plan in plans"
      :key="plan.name"
      :name="plan.name"
      :color="plan.color"
      :benefits="plan.benefits"
      :top-side-text="plan.topSideText"
      :button-text="plan.buttonText"
      :about="plan.about"
      :additional-conditions="plan.additionalConditions"
    />
  </section>
</template>

<style lang="scss" scoped>
.plans {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  margin: 0 32px 72px;
  justify-content: center;
}
</style>
