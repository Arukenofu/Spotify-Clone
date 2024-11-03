import type {Entities} from "@/services/types/Entities";

export interface EntityPreview {
    id: number,
    name: string,
    imageUrl: string | null,
    description: string | null,
    color: string | null,
    type: Entities;
}