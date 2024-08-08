import type {Directive} from 'vue'

export default {
    beforeMount: (element, binding) => {
        element.clickOutsideEvent = (event: Event) => {
            if (!(element === event.target || element.contains(event.target))) {
                binding.value(event);
            }
        }

        document.addEventListener('click', element.clickOutsideEvent);
    },

    unmounted: (element) => {
        document.removeEventListener('click', element.clickOutsideEvent);
    }
} as Directive;