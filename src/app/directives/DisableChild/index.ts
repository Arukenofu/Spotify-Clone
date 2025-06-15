import type { Directive } from 'vue'

export default {
  mounted: (el: HTMLElement) => {
    const children = el.querySelectorAll<HTMLElement>('*')
    children.forEach((child) => {
      child.style.pointerEvents = 'none'
    })
  },
} satisfies Directive
