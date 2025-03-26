import * as dotenv from 'dotenv';

dotenv.config();

const PUBLIC_MEILI_HOST = process.env.PUBLIC_MEILI_HOST || 'http://localhost:7700';
const PRIVATE_MEILI_API_KEY = process.env.PRIVATE_MEILI_API_KEY;

import { MeiliSearch } from 'meilisearch';

const meilisearchClient = new MeiliSearch({
    host: PUBLIC_MEILI_HOST,
    apiKey: PRIVATE_MEILI_API_KEY
});

export default meilisearchClient;
