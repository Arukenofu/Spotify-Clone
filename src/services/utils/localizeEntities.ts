import type { ItemTypes } from '@spotify/web-api-ts-sdk'
import { useI18n } from 'vue-i18n'

export default function (entity: ItemTypes) {
  const { t } = useI18n()

  return t(`entities.${entity.toLowerCase()}`)
}
