import { useToastStore } from '@/widgets/Toast/store/useToastStore'

export default function addToast(value: string) {
  const store = useToastStore()

  if (store.toasts.includes(value)) {
    return
  }

  store.toasts.push(value)

  setTimeout(() => {
    const index = store.toasts.indexOf(value)
    if (index !== -1) {
      store.toasts.splice(index, 1)
    }
  }, 5000)
}
