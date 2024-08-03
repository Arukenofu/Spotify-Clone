import {useConfigStore} from "@/shared/store/useConfigStore";

export default function (value?: string) {
    const config = useConfigStore();

    if (!value) {
        document.title = config.websiteTitle;
        return;
    }

    document.title = value;
}