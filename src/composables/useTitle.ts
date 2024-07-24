import {useMusicStore} from "@/store/useMusicStore";
import {useConfigStore} from "@/store/useConfigStore";

export default function (value?: string) {
    const config = useConfigStore();

    if (!value) {
        document.title = config.websiteTitle;
        return;
    }

    const store = useMusicStore();

    if (store.isPlaying) {
        config.websiteTitle = value;

        return;
    }

    document.title = value;
}