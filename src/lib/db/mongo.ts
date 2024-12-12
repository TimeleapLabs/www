import { MONGO_URL } from '$env/static/private';
import { Db, MongoClient } from 'mongodb';

let client: MongoClient | null = null;

export const getDB = async (): Promise<Db> => {
	if (!client) {
		client = new MongoClient(MONGO_URL);
		await client.connect();
	}

	return client.db('kenshi-io');
};
