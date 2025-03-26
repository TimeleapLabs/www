
import { MEILI_HOST, MEILI_API_KEY } from '$env/static/private';
import { MeiliSearch } from 'meilisearch';

export const meilisearchClient = new MeiliSearch({
    host: MEILI_HOST,
    apiKey: MEILI_API_KEY
});