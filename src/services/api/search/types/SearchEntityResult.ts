import type {Entities} from "@/services/types/Entities";
import type {Track} from "@/services/types/Entities/Track";
import type {RecommendationItem} from "@/services/types/Recommendation";

export type SearchEntityResult<T extends Entities> =
    T extends 'Track'
        ? Track[]
        : RecommendationItem[]