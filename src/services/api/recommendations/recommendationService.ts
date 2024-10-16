import { mixes } from '@/services/api/recommendations/mocks/mixes';
import {recommendations} from "@/services/api/recommendations/mocks/recommendations";

export class RecommendationService {
  async getRecommendations() {
    // return await api<Recommendations[]>('/recommendations/')
    return recommendations;
  }

  async getRecommendationMixes() {
    // return await api<RecommendationMixes[]>('/recommendations/mixes');
    return mixes;
  }

}