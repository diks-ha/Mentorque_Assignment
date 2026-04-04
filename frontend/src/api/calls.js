import { api } from './client.js';

export async function bookCall(data) {
    return api('POST', '/api/calls/book', data);
}

export async function listCalls(filters = {}) {
    const params = new URLSearchParams(filters).toString();
    return api('GET', `/api/calls?${params}`);
}

