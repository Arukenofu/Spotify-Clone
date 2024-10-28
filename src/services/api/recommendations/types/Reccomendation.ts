interface RecommendationList {
    id: number,
    name: string,
    imageUrl: string | null,
    description: string | null,
    color: string | null
}

export interface Recommendation {
    sectionId: number;
    naming: string | null;
    type: 'Playlist' | 'Artist';
    list: RecommendationList[];
}