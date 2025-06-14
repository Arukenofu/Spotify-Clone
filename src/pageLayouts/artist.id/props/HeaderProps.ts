import type {Image} from "@spotify/web-api-ts-sdk";

export interface HeaderProps {
    mask: string | null,
    name: string,
    listenersPerMonth: number,
    images: Image[],
    coverImage?: string,
}