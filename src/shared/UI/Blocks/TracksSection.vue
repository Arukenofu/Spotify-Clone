<script setup lang="ts">
interface Props {
  naming: string;
  prefix?: string;
  postfix?: string;
}
defineProps<Props>();

const isExpanded = defineModel<boolean | null>('isExpanded', {
  required: false,
  default: null
});
</script>

<template>
  <section class="v-tracks-section">
    <div class="heading">
      <span v-if="prefix" class="span">{{prefix}}</span>
      <h2 class="naming">{{naming}}</h2>
      <span v-if="postfix" class="span">{{postfix}}</span>
    </div>
    <div class="wrapper">
      <slot />
    </div>
    <button v-if="isExpanded !== null" class="expand" @click="isExpanded = !isExpanded">
      {{isExpanded ? 'Свернуть' : 'Ещё'}}
    </button>
  </section>
</template>

<style scoped lang="scss">
.v-tracks-section {
  display: grid;
  grid-template-columns: 1fr;

  .heading {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
    gap: 6px;

    .naming {
      font-size: 1.5rem;
      font-weight: 700;
      width: 100%;
    }

    .span {
      font-size: .875rem;
      font-weight: 400;
      color: hsla(0,0%,100%,.7);
    }
  }

  .expand {
    width: min-content;
    padding: 16px;
    background: transparent;
    border: none;
    font-weight: 700;
    font-size: .875rem;
    color: hsla(0,0%,100%,.7);

    &:hover {
      color: var(--white);
    }
  }
}
</style>