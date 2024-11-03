import type {Entities} from "@/services/types/Entities";
import type {Music} from "@/services/types/Music";
import type {EntityPreview} from "@/services/types/Entities/EntityPreview";

export type SearchEntityResult<T extends Entities> =
    T extends 'Track'
        ? Music[]
        : EntityPreview[]