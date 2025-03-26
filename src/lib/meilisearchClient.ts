import { PRIVATE_MEILI_ADD_DOCUMENTS_API_KEY } from '$env/static/private';
import { PUBLIC_MEILI_HOST } from '$env/static/public';
import { MeiliSearch } from 'meilisearch';

const meilisearchClient = new MeiliSearch({
    host: PUBLIC_MEILI_HOST,
    apiKey: PRIVATE_MEILI_ADD_DOCUMENTS_API_KEY
});

export default meilisearchClient;
