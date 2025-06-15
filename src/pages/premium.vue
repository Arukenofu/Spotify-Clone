<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import StickyHeader from '@/shared/UI/Blocks/StickyHeader.vue'
import CheckIcon from '@/shared/UI/Icons/CheckIcon.vue'
import Logo from '@/shared/UI/Icons/Logo.vue'
import setTitle from '@/shared/utils/setTitle'
import { PremiumCards } from '@/widgets/PremiumCards'

setTitle('Spotify — Premium')

const layoutScrollY = inject('layoutScrollY', ref(0))

const computeOpacity = computed<number>(() => {
  if (layoutScrollY.value === 0) {
    return 0
  }

  return Math.min(layoutScrollY.value / 8, 1)
})

const benefits = [
  'Музыка без рекламы',
  'Возможность скачивать треки',
  'Треки в любом порядке',
  'Высокое качество звука',
  'Групповые сеансы с друзьями',
  'Добавление треков в очередь',
]

const comparisons = [
  {
    text: 'Музыка без рекламы',
    bubble: 'Слушайте музыку без рекламных пауз',
  },
  {
    text: 'Скачать треки',
    bubble:
      'Слушайте альбомы и плейлисты даже без подключения к интернету. Скачивйте до 10000 треков на разных устройствах.',
  },
  {
    text: 'Треки в любом порядке',
    bubble:
      'Полный контроль над воспроизведением: повтор и перемотка треков, а также прослушивание композиции из альбомов в любом порядке',
  },
  {
    text: 'Высокое качество звука',
    bubble: `Бесплатная версия Spotify: <br>
             стандартное качество звука (~160 кбит/с) <br>
             Premium-подписка: высокое качество звука(~320 кбит/с)`,
  },
  {
    text: 'Групповые сеансы с друзьями',
    bubble: `Приглашайте друзей и близких, где бы они ни находились. <br>
             Вместе управляйте порядком треков. <br>
             Выбирайте композиции и слушайте их на колонке.`,
  },
  {
    text: 'Добавление треков в очередь',
    bubble: 'Добавляйте, удаляйте и меняйте местами треки в очереди.',
  },
]
</script>

<template>
  <StickyHeader
    class="header"
    :style="`opacity: ${computeOpacity}`"
  />
  <div class="main">
    <div class="gradient-header">
      <div class="gradient-header-inner">
        <h1>Три месяца Premium за $0.00</h1>
        <p>
          Слушайте музыку без рекламы, офлайн и не только. Отменить подписку
          можно в любой момент.
        </p>
        <div class="buttons">
          <button>Попробовать 3 месяца бесплатно</button>

          <button>Посмотреть все планы</button>
        </div>

        <span>
          Только Индивидуальная подписка Spotify Premium. Бесплатно 3 месяца,
          затем 4,99$ в месяц. Только для новых подписчиков. Действуют
          <a>Условия</a>. <br>
          Акция заканчивается 17 сентября 2024г.
        </span>
      </div>
    </div>

    <section class="about-payment">
      <h1>Доступные планы под любые потребности</h1>
      <p>
        Слушайте музыку без рекламы сколько угодно на телефоне, колонке и других
        устройствах. Просто выберите Premium-подписку. Оплата различными
        способами. Отменить подписку можно в любой момент.
      </p>
    </section>

    <section class="benefits">
      <h2>Все Premium-подписки включают:</h2>

      <ul>
        <li
          v-for="benefit in benefits"
          :key="benefit"
        >
          <CheckIcon class="check" />
          <div class="added-at">
            {{ benefit }}
          </div>
        </li>
      </ul>
    </section>

    <PremiumCards />

    <section class="comparison-header">
      <div class="comparison-header-inner">
        <h1>Почувствуйте разницу</h1>
        <p>
          Переходите на Premium и управляйте своей музыкой. Отменить подписку
          можно в любой момент.
        </p>
      </div>
    </section>

    <section class="comparison-table">
      <table>
        <thead>
          <tr>
            <th class="what-you-get">
              Что вы получите
            </th>
            <th class="free-version">
              <div class="inner">
                Бесплатная <br>
                версия Spotify
              </div>
            </th>
            <th class="premium-version">
              <div class="inner">
                <div class="logo">
                  <Logo class="icon" />
                  <span>Premium</span>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(comparison, index) in comparisons"
            :key="index"
          >
            <td>
              <span>
                {{ comparison.text }}
              </span>

              <div
                class="bubble"
                v-html="comparison.bubble"
              />
            </td>
            <td>—</td>
            <td>
              <div class="round">
                <CheckIcon class="icon" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.header {
  top: 0;
}

.main {
  display: flex;
  flex-direction: column;
  container: premium / inline-size;
  padding-bottom: 32px;

  .gradient-header {
    width: 100%;
    height: 350px;
    background-image: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.5)),
      linear-gradient(78.87deg, #b00d6e -3.32%, #004695 112.02%);

    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 16px;

    .gradient-header-inner {
      display: flex;
      flex-direction: column;
      max-width: 760px;
      text-align: center;

      h1 {
        font-weight: 900;
        font-size: 2rem;
        margin-bottom: 12px;
      }

      p {
        font-size: 18px;
      }

      .buttons {
        margin: 24px 0;
        display: flex;
        justify-content: center;

        button {
          border: none;
          margin: 8px;
          border-radius: 500px;
          display: block;
          text-align: center;
          padding: 8px 32px;
          font-size: 1rem;
          font-weight: 700;
          line-height: 1.3;
          background-color: transparent;
          cursor: pointer;
          transition-duration: 33ms;
          transition-property: filter, scale;

          &:first-child {
            max-width: 320px;
            background-color: var(--white);
            color: var(--black);
          }

          &:last-child {
            border: 1px solid var(--white);
          }

          &:hover {
            scale: 1.04;
            filter: brightness(1.2);
          }

          &:active {
            filter: brightness(0.8);
            scale: 1 !important;
          }
        }
      }

      span {
        font-size: 0.75rem;
        line-height: 1.5;
        font-weight: 400;
        text-align: center;

        a {
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }

  .about-payment {
    padding: 32px 16px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1,
    p {
      text-align: center;
      max-width: 700px;
    }

    h1 {
      text-wrap: balance;
      font-size: 2rem;
      font-weight: 700;
    }

    p {
      margin-top: 8px;
      line-height: 1.4;
      font-size: 18px;
      font-weight: 500;
    }
  }

  .benefits {
    display: inline-flex;
    flex-direction: column;
    padding: 20px;
    margin: 48px auto;

    h2 {
      font-size: 2rem;
      font-weight: 700;
      text-align: center;
      text-wrap: balance;
    }

    ul {
      margin-top: 12px;
      list-style: none;
      padding: 0 32px;
      overflow-wrap: break-word;
      display: inline-flex;
      flex-direction: column;

      li {
        display: inline-flex;
        align-items: center;
        gap: 4px;

        .check {
          fill: var(--white);
          width: 24px;
          height: 24px;
        }

        .added-at {
          font-size: 1rem;
        }
      }
    }

    @container premium (width >= 768px) {
      & {
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }
    }

    @media screen and (width >= 1229px) {
      & {
        max-width: 1069px;
      }
    }

    @media screen and (width <= 862px) {
      & {
        max-width: 702px;
      }
    }
  }

  .comparison-header {
    padding: 32px 16px;
    display: flex;
    align-items: center;
    justify-content: center;

    .comparison-header-inner {
      max-width: 680px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 5px;

      h1 {
        font-weight: 700;
        font-size: 2rem;
        text-wrap: balance;
      }

      p {
        font-size: 18px;
        font-weight: 400;
        line-height: 1.4;
      }
    }
  }

  .comparison-table {
    padding: 32px 16px;
    display: flex;
    justify-content: center;

    table {
      border-collapse: collapse;

      thead {
        border-bottom: 1px solid #d9dadc;

        tr {
          vertical-align: baseline;

          th {
            min-width: 130px;
            overflow: hidden;
            text-align: left;
            vertical-align: bottom;
          }

          .what-you-get {
            text-align: left;
            overflow: hidden;
            min-width: 200px;
            padding: 4px 8px 12px;
          }

          .free-version {
            .inner {
              box-shadow: inset -2px 0 14px -7px rgba(0, 0, 0, 0.55);
              height: 100px;
              padding: 16px 16px 40px;
              font-weight: 700;
              line-height: 1.4;
            }
          }

          .premium-version {
            .inner {
              background: linear-gradient(
                rgba(255, 210, 215, 0.08) 20%,
                rgba(255, 210, 215, 0) 90%
              );
              height: 100px;
              padding: 16px;
              display: flex;
              align-items: center;

              .logo {
                display: flex;
                align-items: center;

                .icon {
                  fill: var(--white);
                  width: 24px;
                  height: 24px;
                }

                span {
                  margin: 4px;
                }
              }
            }
          }
        }
      }

      tbody {
        tr {
          transition: background-color 0.1s ease-in-out;
          cursor: pointer;

          &:hover {
            background-color: hsla(0, 0%, 100%, 0.1);

            td:nth-child(1) .bubble {
              opacity: 1;
              visibility: visible;
            }

            td:nth-child(3) {
              background-color: hsla(0, 0%, 100%, 0.1);
            }
          }

          td {
            height: 72px;
            border-bottom: 1px solid #d9dadc;
            text-align: center;

            &:nth-child(1) {
              position: relative;
              text-align: left !important;

              span {
                font-size: 1rem;
                max-width: 250px;
                padding-left: 8px;
                padding-right: 16px;
                text-decoration: underline dashed hsla(0, 0%, 100%, 0.5) 1px;
                text-underline-offset: 4px;
                vertical-align: middle;
              }

              .bubble {
                position: absolute;
                left: -10px;
                bottom: 100%;
                transition: opacity 0.15s ease-in-out;
                opacity: 0;
                border-radius: 6px;
                text-align: left;
                visibility: hidden;
                background-color: var(--white);
                color: var(--black);
                padding: 6px 12px;
                font-size: 0.9rem;
                line-height: 1.3;
                font-weight: 500;
                user-select: none;
                pointer-events: none;
              }
            }

            &:nth-child(3) {
              background-color: #1a1a1a;

              .round {
                margin: 0 auto;
                border-radius: 50%;
                display: grid;
                place-items: center;
                height: 32px;
                width: 32px;
                background-color: var(--white);

                .icon {
                  width: 20px;
                  height: 20px;
                }
              }
            }
          }
        }
      }
    }
  }
}

.header {
  position: fixed;
  background-color: var(--ui);
  transition: opacity 0.25s ease-out;
}
</style>
