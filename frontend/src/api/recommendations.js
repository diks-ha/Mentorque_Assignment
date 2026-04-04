import { api } from './client.js';

export async function getRecommendations(userId) {
    return api('GET', `/api/recommendations/${userId}`);
}

