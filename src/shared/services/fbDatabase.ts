import { DatabaseReference, getDatabase, ref, update } from "firebase/database";

export const getDataRef = (tablePath: string): DatabaseReference => {
	const database = getDatabase();

	const responseRef = ref(database, tablePath);

	return responseRef;
};

export const updateData = (newData: unknown, path: string) => {
	const database = getDatabase();
	const updates: Record<string, unknown> = {};
	let success = true;

	updates[path] = newData;

	update(ref(database), updates)
		.then()
		.catch((error) => {
			console.error("Error on data update", error);
			success = false;
		});

	return success;
};
