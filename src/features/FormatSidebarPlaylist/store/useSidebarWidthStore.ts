import { defineStore, storeToRefs } from 'pinia';
import useCachedRef from '@/shared/composables/useCachedRef';
import defaultWidth from '@/widgets/LayoutSideBar/constants/defaultWidth';
import { computed, onMounted, watch } from 'vue';

const useSidebarWidthStore = defineStore('useSidebarStore', () => {
  const currentWidth = useCachedRef<number>('currentWidth', defaultWidth);

  const isMinimized = computed(() => {
    return currentWidth.value <= 72;
  });

  function setStyleWidth(value: number) {
    document.documentElement.style.setProperty('--sidebar-width', `${value}px`);
  }

  watch(currentWidth, (value) => {
    setStyleWidth(value);
  });

  onMounted(() => {
    setStyleWidth(currentWidth.value);
  });

  return {
    isMinimized,
    currentWidth
  };
});

export default function () {
  const store = useSidebarWidthStore();

  return {
    ...storeToRefs(store)
  };
}
