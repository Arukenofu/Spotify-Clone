import type {Entities} from "@/services/types/Entities";

export type FormatEntities = Exclude<Entities, 'User' | 'Track'> | 'Folder';

export interface FormatProps {
  id: number;
  name: string;
  type: FormatEntities;
  owner: string;
  image?: string | null;
}
