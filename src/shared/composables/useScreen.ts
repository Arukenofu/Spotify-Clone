import {onMounted, onUnmounted, ref} from "vue";

export default function() {
    const isFullscreen = ref(!!document.fullscreenElement);

    function enableFullscreen() {
        document.documentElement.requestFullscreen().then(() => {
            isFullscreen.value = true;
        });
    }

    function exitFullScreen() {
        document.exitFullscreen().then(() => {
            isFullscreen.value = false;
        });
    }

    function handleFullscreen() {
        isFullscreen.value = !!document.fullscreenElement;
        console.log('asd');
    }

    onMounted(() => {
        document.addEventListener('fullscreenchange', handleFullscreen);
    });

    onUnmounted(() => {
        document.addEventListener('fullscreenchange', handleFullscreen);
    });

    return {
        isFullscreen,
        enableFullscreen,
        exitFullScreen
    }
}