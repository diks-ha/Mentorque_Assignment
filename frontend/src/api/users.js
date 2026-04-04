import { api } from './client.js';

export async function getUsers() {
    return api('GET', '/api/users');
}

export async function getMentors() {
    return api('GET', '/api/users/mentors');
}

