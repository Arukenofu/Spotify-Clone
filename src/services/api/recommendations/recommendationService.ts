import { mixes } from '@/services/api/recommendations/mocks/mixes';
import {recommendations} from "@/services/api/recommendations/mocks/recommendations";
import type { Recommendation } from './types/Reccomendation';
import type { RecommendationMixes } from './types/RecommendationMixes';

export class RecommendationService {
  async getRecommendations() {
    // GET /api/recommendations
    return recommendations satisfies Recommendation[];
  }

  async getRecommendationMixes() {
    // GET /api/recommendations/mixes
    return mixes satisfies RecommendationMixes[];
  }

}