import {computed} from "vue";
import {useUserConfigStore} from "@/store/useUserConfigStore";
import {storeToRefs} from "pinia";

type MusicRepeatMode = "onlyCurrentMusic" | "wholeMusicsQueue" | "repeatOnlyCurrentMusic";

export default function () {
    const repeatModes: MusicRepeatMode[] = ["onlyCurrentMusic", "wholeMusicsQueue", "repeatOnlyCurrentMusic"];
    const userConfig = useUserConfigStore();
    const {currentRepeatModeIndex, isShuffle} = storeToRefs(userConfig);

    const currentRepeatMode = computed({
        set(newValue: MusicRepeatMode) {
            currentRepeatModeIndex.value = repeatModes.findIndex(value => value === newValue);
        },
        get() {
            return repeatModes[currentRepeatModeIndex.value]
        }
    });

    function nextRepeatMode() {
        currentRepeatModeIndex.value = (currentRepeatModeIndex.value + 1) % repeatModes.length;
    }

    return {
        currentRepeatMode,
        isShuffle,
        nextRepeatMode
    }

}