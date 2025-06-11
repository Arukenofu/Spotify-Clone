import {useAudioStream} from "@/features/MediaPlayer/composables/useAudioStream";
import {reactive} from "vue";

const stream = reactive(useAudioStream(() => {

}));

const musicUtils = {

}

export {musicUtils};