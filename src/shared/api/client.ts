import {ofetch} from 'ofetch';

const API_BASE_URL = import.meta.env.PROD ? '/api' : 'http://localhost:3000/api';

export const apiClient = ofetch.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Пример использования:
// export const searchApi = {
//     search: (query: string) => apiClient.get('/search', { params: { query } }),
//     getTracks: () => apiClient.get('/tracks'),
// }; 