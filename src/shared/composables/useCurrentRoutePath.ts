import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export default function (watchSource: 'path' | 'fullPath' = 'fullPath') {
  const route = useRoute()
  const currentRoutePath = ref<string>(route[watchSource])

  watch(
    () => route[watchSource],
    (value) => {
      currentRoutePath.value = value
    },
  )

  return {
    currentRoutePath,
  }
}
