import { useI18n } from 'vue-i18n'

export default function (item: string, ...args: any) {
  const { t } = useI18n()

  return t(`contextmenu-items.${item}`, args)
}
