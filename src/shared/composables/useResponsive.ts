import {onMounted, onUnmounted, ref} from "vue";

export default function () {
    const isMobile = ref<boolean>(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    const screenWidth = ref<number>(window.innerWidth);
    const screenHeight = ref<number>(window.innerHeight);

    function onResize() {
        isMobile.value = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        screenWidth.value = window.innerWidth;
        screenHeight.value = window.innerHeight;
    }

    onMounted(() => {
        window.addEventListener('resize', onResize);
    })

    onUnmounted(() => {
        window.removeEventListener('resize', onResize);
    });

    return {
        isMobile,
        screenWidth,
        screenHeight
    }
}