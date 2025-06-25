import type { CountryCodeA2, Market } from '@spotify/web-api-ts-sdk'

export default function<T extends CountryCodeA2 | Market>() {
  return new Intl.Locale(navigator.language).region as T
}
