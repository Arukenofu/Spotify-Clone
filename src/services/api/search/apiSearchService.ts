import type {Entities} from "@/services/types/Entities";
import api from "@/services/api";
import type {SearchEntityResult} from "@/services/api/search/types/SearchEntityResult";
import type {SearchAllResult} from "@/services/api/search/types/SearchAllResult";

class ApiSearchService {
    async searchAll(query: string) {
        return await api<SearchAllResult>('/api/search', {
            method: "POST",
            body: {
                query: query
            }
        });
    }

    async searchEntity<T extends Entities>(query: string, entity: T) {
        return await api<SearchEntityResult<T>>('/api/search', {
            method: "POST",
            body: {
                query: query,
                entity: entity
            }
        })
    }
}

const apiSearchService = new ApiSearchService();
export default apiSearchService;