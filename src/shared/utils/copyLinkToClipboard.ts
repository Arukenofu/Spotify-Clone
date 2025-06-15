import { addToast } from '@/widgets/Toast'

export function copyLinkToClipboard(value: string) {
  navigator.clipboard
    .writeText(value)
    .then(() => {
      addToast('Ссылка скопирована в буфер обмена')
    })
    .catch(() => {
      addToast('Не удалось скопировать ссылку')
    })
}
