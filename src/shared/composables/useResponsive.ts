import { ref } from 'vue';

export default function () {
  const isMobile = ref<boolean>(
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  );
  const screenWidth = ref<number>(window.innerWidth);
  const screenHeight = ref<number>(window.innerHeight);

  function update() {
    isMobile.value =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    screenWidth.value = window.innerWidth;
    screenHeight.value = window.innerHeight;
  }

  function getOs() {
    const userAgent = window.navigator.userAgent.toLowerCase();

    if (userAgent.indexOf('android') !== -1) {
      return 'Android';
    } else if (
      userAgent.indexOf('iphone') !== -1 ||
      userAgent.indexOf('ipad') !== -1
    ) {
      return 'iOS';
    } else if (userAgent.indexOf('win') !== -1) {
      return 'Windows';
    } else if (userAgent.indexOf('mac') !== -1) {
      return 'macOS';
    } else if (userAgent.indexOf('linux') !== -1) {
      return 'Linux';
    } else {
      return 'Unknown';
    }
  }

  return {
    isMobile,
    screenWidth,
    screenHeight,
    update,
    getOs
  }
}
