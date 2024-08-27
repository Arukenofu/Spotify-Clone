<script setup lang="ts">
import Logo from "@/UI/Icons/Shared/Logo.vue";
import type {PremiumPlanProps} from '../types/PremiumPlanProps'

defineProps<PremiumPlanProps>();
</script>

<template>
  <div class="card">
    <div class="topSide" v-if="topSideText">
      {{topSideText}}
    </div>

    <div class="heading">
      <div class="logo">
        <Logo class="icon" />
        <span>Premium</span>
      </div>

      <h3>{{name}}</h3>

      <template v-if="typeof additionalConditions === 'object'">
        <p class="c-head">{{additionalConditions.head}}</p>
        <p class="c-tail">{{additionalConditions.tail}}</p>
      </template>

      <p class="price" v-else>
        {{additionalConditions}}
      </p>

      <hr>
    </div>

    <ul>
      <li v-for="benefit in benefits" :key="benefit">
        {{benefit}}
      </li>
    </ul>

    <button>
      {{buttonText}}
    </button>

    <div class="about" v-html="about" />
  </div>
</template>

<style lang="scss" scoped>
.card {
  position: relative;
  padding: 0 16px 12px;
  display: flex;
  flex-direction: column;
  background-color: #242424;
  width: 335px;
  border-radius: 8px;

  .topSide {
    position: absolute;
    top: 0;
    left: 0;
    padding: 8px 16px;
    font-size: 1rem;
    font-weight: 700;
    color: var(--black);
    line-height: 1;
    background-color: v-bind('color');
    border-top-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  .heading {
    margin-top: 56px;

    .logo {
      display: flex;
      align-items: center;

      .icon {
        width: 24px;
        height: 24px;
        fill: var(--white);
      }

      span {
        margin: 4px;
        font-weight: 900;
      }
    }

    h3 {
      font-size: 1.95rem;
      font-weight: 900;
      margin: 6px 0;
      line-height: 1.45;
      color: v-bind('color');
    }

    .c-head {
      color: var(--white);
      font-weight: 600;
      font-size: 1rem;
      margin-bottom: 3px;
    }

    .c-tail {
      color: var(--text-soft);
      font-weight: 600;
      font-size: .875rem;
    }

    .price {
      font-size: 1.05rem;
      font-weight: 700;
    }

    hr {
      border: none;
      border-block-start: 1px solid hsla(0,0%,100%,.1);
      margin-block: 16px 0;
    }
  }

  ul {
    padding-left: 16px;
    flex-grow: 1;
    margin: 20px 0 24px;

    li {
      font-size: .95rem;
      margin-bottom: 2px;
      line-height: 1.3;
    }
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: v-bind('color');
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.3;
    min-height: 48px;
    padding: 8px 32px;
    border-radius: 500px;
    color: var(--black);
    cursor: pointer;
    border: none;

    &:hover {
      filter: brightness(1.1);
    }
  }

  .about {
    color: var(--text-soft);
    min-height: 46px;
    font-size: .65rem;
    text-align: center;
    margin-top: 12px;
    line-height: 1.3;
  }
}
</style>