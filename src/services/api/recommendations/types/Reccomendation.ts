import type {EntityPreview} from "@/services/types/Entities/EntityPreview";

interface RecommendationList extends EntityPreview {
}

export interface Recommendation {
    sectionId: number;
    naming: string | null;
    list: RecommendationList[];
}