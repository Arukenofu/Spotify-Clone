import { router } from '@/app/router';

export default async function (value: string) {
  await router.push(value.replace(/\/{2,}/g, '/').toLowerCase());
}
