import { defineStore, storeToRefs } from 'pinia';
import { type Component, computed, ref, shallowRef } from 'vue';

const contextMenuStore = defineStore('contextMenuStore', () => {
  const core = ref<HTMLElement>();

  const currentComponent = shallowRef<Component | null>(null);

  const isActive = computed(() => {
    return !!currentComponent.value;
  });

  function closeContextMenu() {
    currentComponent.value = null;
  }

  const getCurrentComponent = computed(() => {
    return currentComponent.value;
  });

  function setContextMenuComponent(value: Component) {
    currentComponent.value = value;
  }

  return {
    core,
    isActive,
    getCurrentComponent,
    setContextMenuComponent,
    closeContextMenu
  };
});

export default function () {
  const store = contextMenuStore();
  const { closeContextMenu, setContextMenuComponent } = store;

  return {
    ...storeToRefs(store),
    closeContextMenu,
    setContextMenuComponent
  };
}
