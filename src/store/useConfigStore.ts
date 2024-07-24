import {defineStore} from "pinia";

export const useConfigStore = defineStore('useConfigStore', () => {
    const websiteTitle: string = 'Spotify - Web Player Clone';

    return {
        websiteTitle
    }
})