import { ref } from 'vue'

export default function () {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  const screenWidth = ref<number>(window.innerWidth)
  const screenHeight = ref<number>(window.innerHeight)

  function getOs() {
    const userAgent = window.navigator.userAgent.toLowerCase()

    if (userAgent.includes('android')) {
      return 'Android'
    }
    else if (
      userAgent.includes('iphone')
      || userAgent.includes('ipad')
    ) {
      return 'iOS'
    }
    else if (userAgent.includes('win')) {
      return 'Windows'
    }
    else if (userAgent.includes('mac')) {
      return 'macOS'
    }
    else if (userAgent.includes('linux')) {
      return 'Linux'
    }
    else {
      return 'Unknown'
    }
  }

  return {
    isMobile,
    screenWidth,
    screenHeight,
    getOs,
  }
}
