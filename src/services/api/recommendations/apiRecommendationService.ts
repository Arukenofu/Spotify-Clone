import { mixes } from '@/services/api/recommendations/mocks/mixes';
import {recommendations} from "@/services/api/recommendations/mocks/recommendations";
import type { Recommendation } from '@/services/types/Recommendation';
import type { RecommendationMixes } from './types/RecommendationMixes';

class ApiRecommendationService {
  async getRecommendations() {
    // GET /api/recommendations
    return recommendations satisfies Recommendation[];
  }

  async getRecommendationMixes() {
    // GET /api/recommendations/mixes
    return mixes satisfies RecommendationMixes[];
  }

}

const recommendationService = new ApiRecommendationService();
export default recommendationService;