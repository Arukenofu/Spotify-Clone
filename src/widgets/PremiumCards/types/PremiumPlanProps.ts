import type { CSSProperties } from 'vue';

export interface PremiumPlanProps {
  name: string;
  color: CSSProperties['color'];
  benefits: string[];
  buttonText: string;
  about: string;

  additionalConditions:
    | {
        head: string;
        tail: string;
      }
    | string;
  topSideText?: string;
}
