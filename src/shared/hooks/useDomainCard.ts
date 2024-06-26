import React from "react";
import { SkillCard } from "../types";
import { useRecoilState, useRecoilValue } from "recoil";
import { fbAppState, fbUserState, skillCardsListState } from "../state";
import { getDataRef } from "../services";
import { onValue, update } from "firebase/database";
import { cloneObj, isEqual } from "../utils";

const BASE_URL = "domains";

export const useDomainCard = () => {
	const fbApp = useRecoilValue(fbAppState);
	const fbUser = useRecoilValue(fbUserState);
	const [isLoading, setIsLoading] = React.useState(false);
	const [coreCardsObj, setCoreCardsObj] = React.useState<
		Record<string, SkillCard>
	>({});
	const [customCardsObj, setCustomCardsObj] = React.useState<
		Record<string, SkillCard>
	>({});
	const [skillCardsList, setSkillCardsList] =
		useRecoilState(skillCardsListState);

	const getCardsList = React.useCallback(
		(
			setStateCallback: (param1: Record<string, SkillCard>) => void,
			cardListType = "core"
		) => {
			if (!isLoading && fbApp) {
				setIsLoading(true);

				const fbRef = getDataRef(`${BASE_URL}/${cardListType}`);

				onValue(fbRef, (snapshot) => {
					const cardsList = snapshot.val() || {};

					setStateCallback(cardsList);
					setIsLoading(false);
				});
			}
		},
		[fbApp, isLoading]
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
		(
			newCard: SkillCard,
			options: {
				isDeletion?: boolean;
			} = {}
		) => {
			const { isDeletion = false } = options;
			let success = true;
			let fetched = false;

			if (fbApp && !isLoading && fbUser?.uid) {
				setIsLoading(true);
				const cardType = newCard.isHomebrew ? fbUser.uid : "core";
				const fbRef = getDataRef(`${BASE_URL}/${cardType}`);
				fetched = true;
				const { id: cardId } = newCard;
				const updatedObj: Record<string, SkillCard | null> = newCard.isHomebrew
					? cloneObj(customCardsObj || {})
					: cloneObj(coreCardsObj || {});

				updatedObj[cardId] = isDeletion ? null : newCard;

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
		[coreCardsObj, customCardsObj, fbApp, fbUser?.uid, isLoading]
	);

	const removeCard = React.useCallback(
		(card: SkillCard, userId?: string) => {
			if (!isLoading) {
				setIsLoading(true);
				if (!userId && fbUser) {
					userId = fbUser.uid;
				}

				if (fbApp && card && userId) {
					return updateCard(card, { isDeletion: true });
				}
			}
		},
		[fbApp, fbUser, isLoading, updateCard]
	);

	React.useEffect(() => {
		const coreCardsArray = Object.values(coreCardsObj);
		const customCardsArray = Object.values(customCardsObj);

		const unifiedList = [...coreCardsArray, ...customCardsArray];

		if (
			(!skillCardsList.length || !isEqual(unifiedList, skillCardsList)) &&
			unifiedList.length > 0
		) {
			setSkillCardsList(unifiedList);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [coreCardsObj, customCardsObj]);

	return { isLoading, fetchCards, updateCard, removeCard };
};
