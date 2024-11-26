import type {Entities} from "@/services/types/Entities";
import type {SearchAllResult} from "@/services/api/search/types/SearchAllResult";
import searchAllResult from "@/services/api/search/mocks/searchAllResult";
import searchEntityResult from "@/services/api/search/mocks/searchEntityResult";
import getSeachHistoryResult from "@/services/api/search/mocks/getSeachHistoryResult";
import type {GetSearchHistoryResult} from "@/services/api/search/types/GetSearchHistoryResult";

class ApiSearchService {
    async searchAll(query: string) {
        return searchAllResult satisfies SearchAllResult;

        // return await api<SearchAllResult>('/api/search', {
        //     method: "POST",
        //     body: {
        //         query: query
        //     }
        // });
    }

    async searchEntity<T extends Entities>(query: string, entity: T) {
        return searchEntityResult(entity);

        // return await api<SearchEntityResult<T>>('/api/search', {
        //     method: "POST",
        //     body: {
        //         query: query,
        //         entity: entity
        //     }
        // })
    }

    async getSearchHistory() {
        return getSeachHistoryResult satisfies GetSearchHistoryResult[];

        // return await api('/api/search/history', {
        //     method: "GET"
        // });
    }

    async addToSearchHistory<T extends Exclude<Entities, 'Track'>>(
        entityId: string | number,
        entityType: T,
    ) {
        return {message: 'OK'}
        // return await api<ResponseOK>('/api/search/history', {
        //     method: "POST",
        //     body: {
        //         entityId: entityId,
        //         entityType: entityType,
        //     }
        // });
    }

    async removeFromSearchHistory(
        id: number | string,
        type: Exclude<Entities, 'Track'>
    ) {
        return {message: 'OK'}
        // return await api<ResponseOK>('/api/search/history', {
        //     method: "DELETE",
        //     body: {
        //         id,
        //         type
        //     }
        // });
    }

    async cleanSearchHistory() {
        return {message: 'OK'}

        // return await api<ResponseOK>('/api/search/history/clean', {
        //     method: "DELETE"
        // });
    }
}

const apiSearchService = new ApiSearchService();
export default apiSearchService;