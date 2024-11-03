import type {Entities} from "@/services/types/Entities";
import type {Track} from "@/services/types/Entities/Track";
import type {EntityPreview} from "@/services/types/Entities";

export type SearchEntityResult<T extends Entities> =
    T extends 'Track'
        ? Track[]
        : EntityPreview[]