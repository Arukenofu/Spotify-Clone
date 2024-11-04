import type {Entities} from "@/services/types/Entities";
import api from "@/services/api";
import type {SearchEntityResult} from "@/services/api/search/types/SearchEntityResult";
import type {SearchAllResult} from "@/services/api/search/types/SearchAllResult";
import type {ResponseOK} from "@/services/types/Responses/ResponseOK";

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

    async getSearchHistory() {
        return await api('/api/search/history', {
            method: "GET"
        });
    }

    async addToSearchHistory<T extends Exclude<Entities, 'Track'>>(
        entityId: string,
        entityType: T,
    ) {
        return await api<ResponseOK>('/api/search/history', {
            method: "POST",
            body: {
                entityId: entityId,
                entityType: entityType,
            }
        });
    }

    async removeFromSearchHistory<T extends Exclude<Entities, 'Track'>>(
        entityId: string,
        entityType: T,
    ) {
        return await api<ResponseOK>('/api/search/history', {
            method: "DELETE",
            body: {
                entityId: entityId,
                entityType: entityType,
            }
        });
    }

    async cleanSearchHistory() {
        return await api<ResponseOK>('/api/search/history/clean', {
            method: "DELETE"
        });
    }
}

const apiSearchService = new ApiSearchService();
export default apiSearchService;