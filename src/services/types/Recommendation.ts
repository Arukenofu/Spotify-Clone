import type {Entities} from "@/services/types/Entities";

export interface RecommendationItem {
    id: number | string;
    name: string;
    image: string | null;
    description?: string | null;
    color: string | null;
    type: Exclude<Entities, 'Track'>;
}

export interface Recommendation {
    id: number | string;
    naming: string | null;
    list: RecommendationItem[];
}