import {useI18n} from "vue-i18n";
import type {ItemTypes} from "@spotify/web-api-ts-sdk";

export default function (entity: ItemTypes) {
    const {t} = useI18n();

    return t(`entities.${entity.toLowerCase()}`);
}