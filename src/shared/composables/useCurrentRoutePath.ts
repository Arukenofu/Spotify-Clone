import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';

export default function (watchSource: 'path' | 'fullPath' = 'fullPath') {
  const route = useRoute();
  const currentRoutePath = ref<string>(route[watchSource]);

  watch(
    () => route[watchSource],
    (value) => {
      currentRoutePath.value = value;
    }
  );

  return {
    currentRoutePath
  };
}
