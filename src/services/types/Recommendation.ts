import type {Entities} from "@/services/types/Entities";

export interface RecommendationItem {
    id: number,
    name: string,
    image: string | null,
    description?: string | null,
    color: string | null,
    type: Entities;
}

export interface Recommendation {
    id: number | string;
    naming: string | null;
    list: RecommendationItem[];
}