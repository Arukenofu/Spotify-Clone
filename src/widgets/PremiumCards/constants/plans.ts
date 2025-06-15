import type { PremiumPlanProps } from '@/widgets/PremiumCards/types/PremiumPlanProps'

export default [
  {
    name: 'Индивидуальная подписка',
    topSideText: 'Бесплатно 3 месяца',
    color: '#ffd2d7',
    benefits: ['1 Premium-аккаунт', 'Отмена в любой момент'],
    about: `Бесплатно 3 месяца, затем 4,99 $ в месяц. Только для новых подписчиков. Действуют Условия. <br>
                Акция заканчивается 17 сентября 2024г.`,
    buttonText: 'Попробовать 3 месяца бесплатно',
    additionalConditions: {
      head: 'Бесплатно 3 месяца',
      tail: 'Затем подписка будет стоить 4,99 $ в месяц',
    },
  },
  {
    name: 'Premium для студентов',
    topSideText: 'Бесплатно 1 месяц',
    color: '#c5b1d4',
    benefits: [
      '1 подтвержденный Premium-аккаунт',
      'Скидка для студентов, соответствующих требованиям',
      'Отмена в любой момент',
    ],
    about: `Бесплатно 1 месяц, затем 2,49 $ в месяц. Только для новых подписчиков, которые учатся в аккредитованных вузах.<br>
                Действуют Условия.`,
    buttonText: 'Попробовать 1 месяц бесплатно',
    additionalConditions: {
      head: 'Бесплатно 1 месяц',
      tail: 'Затем подписка будет стоить 2,49 $ в месяц',
    },
  },
  {
    name: 'Premium для двоих',
    color: '#ffc863',
    benefits: ['2 Premium-аккаунта', 'Отмена в любой момент'],
    about: `Для двух человек, которые живут по одному адресу. <br> Действуют Условия.`,
    buttonText: 'Получить Premium для двоих',
    additionalConditions: '6,49 $ в месяц',
  },
  {
    name: 'Premium для семьи',
    color: '#a5bbd2',
    benefits: [
      'До 6 Premium-аккаунтов',
      'Управляйте контентом с пометкой Explicit',
      'Отмена в любой момент',
    ],
    about: `До 6 членов семьи, которые живут по одному адресу. <br> Действуют Условия.`,
    buttonText: 'Получить Premium для семьи',
    additionalConditions: '7,99 $ в месяц',
  },
] satisfies PremiumPlanProps[]
