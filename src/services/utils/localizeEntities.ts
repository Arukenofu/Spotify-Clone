import type {Entities} from "@/services/types/Entities";
import {useI18n} from "vue-i18n";

export default function (entity: Entities) {
    const {t} = useI18n();

    return t(`entities.${entity.toLowerCase()}`);
}