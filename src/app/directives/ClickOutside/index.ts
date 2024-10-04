import type { Directive } from 'vue';

export default {
  beforeMount: (element, binding) => {
    element.clickOutsideEvent = (event: Event) => {
      if (!(element === event.target || element.contains(event.target))) {
        binding.value(event);
      }
    };

    document.addEventListener('click', element.clickOutsideEvent, {
      capture: true
    });
    document.addEventListener('contextmenu', element.clickOutsideEvent, {
      capture: true
    });
  },

  unmounted: (element) => {
    document.removeEventListener('click', element.clickOutsideEvent, {
      capture: true
    });
    document.removeEventListener('contextmenu', element.clickOutsideEvent, {
      capture: true
    });
  }
} satisfies Directive;
