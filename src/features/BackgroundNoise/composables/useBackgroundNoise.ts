import {readonly, ref} from 'vue';

export default function (defaultColor?: string) {
  const base = 'var(--ui)';
  const currentColor = ref<string>(defaultColor || base);

  function setColor(color: string | null): void {
    if (!color) {
      currentColor.value = defaultColor || base; return;
    }

    currentColor.value = color;
  }

  return {
    currentColor: readonly(currentColor),
    setColor
  };
}
