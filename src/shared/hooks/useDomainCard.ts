import React from "react";
import { SkillCard } from "../types";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { fbUserState, skillCardsListState } from "../state";
import { getDataRef } from "../services";
import { onValue, update } from "firebase/database";
import { cloneObj } from "../utils";

const BASE_URL = "domains";

export const useDomainCard = () => {
	const fbUser = useRecoilValue(fbUserState);
	const [isLoading, setIsLoading] = React.useState(false);
	const [coreCardsObj, setCoreCardsObj] = React.useState<
		Record<string, SkillCard>
	>({});
	const [customCardsObj, setCustomCardsObj] = React.useState<
		Record<string, SkillCard>
	>({});
	const setSkillCardsList = useSetRecoilState(skillCardsListState);

	const getCardsList = React.useCallback(
		(
			setStateCallback: (param1: Record<string, SkillCard>) => void,
			cardListType = "core"
		) => {
			if (!isLoading) {
				setIsLoading(true);

				const fbRef = getDataRef(`${BASE_URL}/${cardListType}`);

				onValue(fbRef, (snapshot) => {
					const cardsList = snapshot.val() || {};

					setStateCallback(cardsList);
					setIsLoading(false);
				});
			}
		},
		[isLoading]
	);

	const fetchCards = React.useCallback(
		(userId?: string) => {
			if (!userId) {
				userId = fbUser?.uid;
			}
			getCardsList(setCoreCardsObj);
			if (userId) {
				getCardsList(setCustomCardsObj, userId);
			}
		},
		[fbUser?.uid, getCardsList]
	);

	const updateCard = React.useCallback(
		(newCard: SkillCard) => {
			let success = true;
			let fetched = false;

			if (!isLoading && fbUser?.uid) {
				setIsLoading(true);
				const cardType = newCard.isHomebrew ? fbUser.uid : "core";
				const fbRef = getDataRef(`${BASE_URL}/${cardType}`);
				fetched = true;
				const { id: cardId } = newCard;
				const updatedObj: Record<string, SkillCard> = newCard.isHomebrew
					? cloneObj(customCardsObj || {})
					: cloneObj(coreCardsObj || {});

				updatedObj[cardId] = newCard;

				update(fbRef, updatedObj)
					.then()
					.catch((error) => {
						console.error("Error updating card", error);
						success = false;
					})
					.finally(() => {
						setIsLoading(false);
					});

				return success;
			}

			return { success, fetched };
		},
		[coreCardsObj, customCardsObj, fbUser?.uid, isLoading]
	);

	React.useEffect(() => {
		const coreCardsArray = Object.values(coreCardsObj);
		const customCardsArray = Object.values(customCardsObj);

		setSkillCardsList([...coreCardsArray, ...customCardsArray]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [coreCardsObj, customCardsObj]);

	return { isLoading, fetchCards, updateCard };
};
