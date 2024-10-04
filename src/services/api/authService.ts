import { $api } from '@/services/ofetch';
import type { FetchOptions } from 'ofetch';
import type {
  LoginForm,
  RegisterForm
} from '@/services/types/authServiceTypes';

export async function LoginToAccount(
  form: LoginForm,
  options?: FetchOptions<'json'>
) {
  return await $api('/api/auth/login', {
    method: 'POST',
    body: form,
    ...options
  });
}

export async function RegisterAccount(
  form: RegisterForm,
  options?: FetchOptions<'json'>
) {
  return await $api('/api/auth/register', {
    method: 'POST',
    body: form,
    ...options
  });
}
