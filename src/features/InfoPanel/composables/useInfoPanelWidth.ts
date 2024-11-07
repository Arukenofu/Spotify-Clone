import {onMounted, watch} from "vue";
import useCachedRef from "@/shared/composables/useCachedRef";
import min from "@/features/InfoPanel/constants/min";
import max from "@/features/InfoPanel/constants/max";
import defaultWidth from "@/features/InfoPanel/constants/defaultWidth";

const currentPanelWidth = useCachedRef<number>('infoContentWidth', defaultWidth, {
    expectedTypes: ['number'],
    min: min,
    max: max
});

export default function() {
    watch(currentPanelWidth, (value) => {
        document.documentElement.style.setProperty('--panel-width', `${value}`);
    });

    onMounted(() => {
        document.documentElement.style.setProperty('--panel-width', `${currentPanelWidth.value}`);
    });

    return {
        currentPanelWidth
    }
}