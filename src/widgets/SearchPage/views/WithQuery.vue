<script setup lang="ts">
import type {LocationQuery} from "vue-router";
import GreenPlayingButton from "@/UI/Buttons/GreenPlayingButton.vue";

defineProps<{
  queries: LocationQuery
}>();

</script>

<template>
  <div class="layout">
    <section class="top-result">
      <div class="best-result">
        <div class="title">
          Лучший результат
        </div>
        <div class="card">
          <div class="image-outer">
            <img
                src="https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb"
                alt="Music Image"
                width="92px"
                height="92px"
            />
          </div>
          <div class="card-title">
            Mahhabatym
          </div>
          <div class="info">
            <div class="type">
              Трек
            </div>
            <div class="name">
              Moldanazar
            </div>
          </div>

          <GreenPlayingButton
              class="playingState"
              :state="true"
          />
        </div>
      </div>
      <div class="other">

      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  gap: 32px 12px;
  margin-top: 45px;
  padding: 0 var(--content-spacing);
  width: 100%;

  .top-result {
    display: flex;
    width: 100%;
    container: top-results / inline-size;

    @container top-results (min-width: 700px) {
      .best-result {

      }
    }

    .best-result {
      width: 35%;
      height: 230px;

      .title {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 12px;
      }

      .card {
        height: 100%;
        background-color: #181818;
        transition: background-color .3s ease;
        cursor: pointer;
        border-radius: 8px;
        padding: 20px;
        position: relative;

        img {
          border-radius: 4px;
          margin-bottom: 18px;
        }

        .card-title {
          font-size: 2rem;
          font-weight: 900;
        }

        .info {
          margin-top: 6px;
          display: flex;
          font-size: .85rem;

          .type {
            color: var(--text-soft);

            &::after {
              content: "•";
            }
          }

          .name {
            margin-left: 4px;
          }
        }

        .playingState {
          position: absolute;
          right: 24px;
          bottom: 24px;
          transform: translateY(8px);
          opacity: 0;
        }

        &:hover {
          background-color: #282828;

          .playingState {
            transform: translateY(0);
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>