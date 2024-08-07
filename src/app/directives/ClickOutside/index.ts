import type {Directive} from 'vue'

export default {
    beforeMount: (element, binding) => {
        element.clickOutsideEvent = (event: Event) => {
            if (!(element === event.target || element.contains(event.target))) {
                binding.value(event);
            }
        }

        document.addEventListener('click', (event) => {
            element.clickOutsideEvent(event);
        });
    },

    unmounted: (element) => {
        document.removeEventListener('click', (event) => {
            element.clickOutsideEvent(event);
        });
    }
} as Directive;