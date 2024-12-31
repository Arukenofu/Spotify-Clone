export default {
    next: 'Далее',
    steps: {
        title: 'Шаг {0} из 3',
        first: 'Придуймайте пароль',
        second: 'Расскажите о себе',
        third: 'Условия использования'
    },
    zero: {
        title: 'Зарегистрируйтесь и погрузитесь в музыку',
        email: 'Электронная почта',
        haveAnAccount: 'Уже есть аккаунт?',
        login: 'Войдите в него'
    },
    first: {
        password: 'Пароль',
        ruleTitle: 'Пароль должен содержать как минимум',
        rules: {
            oneLetter: '1 букву',
            digitSpecial: '1 цифру или специальный символ (например, # ? ! &)',
            sixSymbol: '6 символов'
        }
    },
    second: {
        username: 'Название',
        usernameDesc: 'Ваше имя появится в профиле.',
        usernameNotChoose: 'Укажите имя для своего профиля.',

        birthday: 'День рождения',
        day: 'дд',
        month: 'Месяц',
        year: 'гггг',

        chooseDayFrom1To31: 'Введите число от 1 до 31.',
        chooseRealBirthDay: 'Введите действительный год рождения.',
        tooYoung: 'Вы еще не достигли возраста, позволяющего создать аккаунт Spotify.',
        tooOld: 'Год рождения должен быть не ранее 1900 г.',

        genders: ['Мужчина', 'Женщина', 'Другое', 'Не хочу выбирать'],
        gender: 'Пол',
        genderDesc: 'Мы учитываем пол при подборе персональных рекомендаций и рекламы.',
        genderNotChoose: 'Выберите свой пол.',
    },
    third: {
        notSendAdvertisement: 'Я не хочу получать рекламные сообщения от Spotify.',
        agreeToProvideInformationToPartners: 'Я разрешаю сообщить мои регистрационные данные партнерам Spotify в целях рекламы.',
        agreeWithPolicy: 'Я принимаю Условия использования и Политику конфиденциальности Spotify.',

        onNotAgreedWithAllTerms: 'Чтобы продолжить, примите Условия использования.',

        register: 'Зарегестрироваться'
    }
}