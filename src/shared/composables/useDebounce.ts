export default function () {
  let timeout: ReturnType<typeof setTimeout>

  function debounce(callback: Function, delay: number) {
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      callback()
    }, delay)
  }

  return {
    debounce,
    clear: () => {
      clearTimeout(timeout)
    },
  }
}
