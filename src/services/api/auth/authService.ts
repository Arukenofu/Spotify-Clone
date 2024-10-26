import api from '@/services/api';
import type {LoginForm} from "@/services/api/auth/types/LoginForm";
import type {RegisterForm} from "@/services/api/auth/types/RegisterForm";


export class AuthService {
  async LoginToAccount(form: LoginForm): Promise<void | Error> {
    const { email, password } = form;

    if (!email || email.length < 6 || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      throw new Error('Введите почту вашего аккаунта Spotify.')
    }
    await this.validateEmail(email);

    if (password.length < 6) {
      throw new Error('Пароль должен состоять из более 6 символов');
    }
    if (password.length > 20) {
      throw new Error('Максимальная длина пароля составляет 20 символов')
    }
    await this.validatePassword(password);

    return await api('/api/auth/login', {
      body: form,
      method: 'POST',
      onRequestError: () => {
        throw new Error('Неправильное имя пользователя или пароль.')
      }
    });
  }

  async RegisterAccount(form: RegisterForm): Promise<void | Error> {
    return await api('/api/auth/register', {
      body: form,
      method: 'POST'
    });
  }

  async validateEmail(email: string): Promise<void | Error> {
    if (!email || email.length < 6 || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      throw new Error('Неправильный формат почты.')
    }

    return await api('/api/auth/checkEmail', {
      method: 'POST',
      body: {
        email: email
      },
      onResponseError: ({ error }) => {
        throw new Error(error?.message);
      }
    });
  }

  async validatePassword(password: string): Promise<void | Error> {
    const validation = {
      length: /[a-zA-Z]/.test(password),
      digitSpecial: /[\d#?!&]/.test(password),
      letter: password.length >= 6
    }

    if (Object.values(validation).includes(false)) {
      throw new Error(JSON.stringify(validation));
    }

    return await api('/api/auth/checkPassword', {
      method: 'POST',
      body: {
        password
      },
      onRequestError: ({ error }) => {
        throw new Error(error.message);
      }
    });
  }
}
