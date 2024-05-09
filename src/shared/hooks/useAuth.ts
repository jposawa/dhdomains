/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { getDataRef, updateData } from "../services";
import { onValue } from "firebase/database";
import { saveStorage } from "../utils";
import { UserInfo } from "firebase/auth";

export const useAuth = () => {
	const [isLoading, setIsLoading] = React.useState(false);

	const syncUserData = React.useCallback(
		(user: UserInfo) => {
			if (user && !isLoading) {
				setIsLoading(true);
				const userPath = `users/${user.uid}`;
				const userRef = getDataRef(userPath);

				onValue(
					userRef,
					(snapshot) => {
						const userData = snapshot.val();

						if (!userData) {
							const newData = {
								name: user.displayName,
								email: user.email,
								uid: user.uid,
							};

							updateData(newData, userPath);
						}

						saveStorage("syncedUser", 1);
						setIsLoading(false);
					},
					{
						onlyOnce: true,
					}
				);
			}
		},
		[isLoading]
	);

	return {
		isLoading,
		setIsLoading,
		syncUserData,
	};
};
