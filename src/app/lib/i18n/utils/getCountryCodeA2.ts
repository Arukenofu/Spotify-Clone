import type { CountryCodeA2 } from '@spotify/web-api-ts-sdk'

export default function () {
  return new Intl.Locale(navigator.language).region as CountryCodeA2
}
