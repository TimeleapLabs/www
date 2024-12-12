import { getDB } from '$lib/db/mongo';

const collectionName = 'wwwPageFeedback';

type Feedback = {
	feedback: {
		fire: number;
		thumbsDown: number;
		rockOn: number;
		party: number;
		heart: number;
		starStruck: number;
	};
	pageId: string;
};

export const getFeedback = async (pageId: string) => {
	const db = await getDB();
	const collection = db.collection<Feedback>(collectionName);
	return await collection.findOne({ pageId });
};

export const addFeedback = async (pageId: string, feedback: string) => {
	const db = await getDB();
	const collection = db.collection<Feedback>(collectionName);
	return await collection.findOneAndUpdate(
		{ pageId },
		{ $inc: { [`feedback.${feedback}`]: 1 } },
		{ upsert: true, returnDocument: 'after' }
	);
};
