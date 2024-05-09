import React from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";
import {
	filterCardByDomain,
	filterCardByHomebrew,
	sortSkillCard,
} from "@/shared/utils";
import { Card, ModalCardFocus } from "@/components";
import { useRecoilState, useRecoilValue } from "recoil";
import { fbUserState, skillCardsListState } from "@/shared/state";

import styles from "./SkillCardManager.module.scss";
import { Domain, SkillCard } from "@/shared/types";
import { useDomainCard } from "@/shared/hooks";
import { LoadingOutlined } from "@ant-design/icons";

const domainOptions: SelectProps["options"] = [];

Object.entries(Domain).forEach(([key, value]) => {
	domainOptions.push({
		label: key,
		value,
	});
});

const sortOptions: SelectProps["options"] = [
	{
		label: "Card level",
		value: "level",
	},
	{
		label: "Recall cost",
		value: "recall",
	},
];

export const SkillCardManager = () => {
	const fbUser = useRecoilValue(fbUserState);
	const { fetchCards, isLoading } = useDomainCard();
	const [skillCardsList] = useRecoilState(skillCardsListState);
	const [activeDomains, setActiveDomains] = React.useState<Domain[]>([]);
	const [activeSort, setActiveSort] = React.useState<keyof SkillCard>("level");
	const [targetHomebrewStatus, setTargetHomebrewStatus] = React.useState<
		string | undefined | null
	>(null);

	const handleDomainChange = (value: string[]) => {
		setActiveDomains(value as Domain[]);
	};

	const handleSortChange = (value: string) => {
		setActiveSort(value as keyof SkillCard);
	};

	const handleHomebrewChange = (value: string | undefined) => {
		if (typeof value !== "string") {
			setTargetHomebrewStatus(null);
		}

		setTargetHomebrewStatus(value);
	};

	const homebrewOptions = React.useMemo((): SelectProps["options"] => {
		if (!fbUser) {
			setTargetHomebrewStatus("");
			return [
				{
					label: "Core only",
					value: "",
				},
			];
		}
		setTargetHomebrewStatus(null);
		return [
			{
				label: "Both types",
				value: null,
			},
			{
				label: "Core only",
				value: "",
			},
			{
				label: "Homebrew",
				value: "homebrew",
			},
		];
	}, [fbUser]);

	React.useEffect(() => {
		if (!isLoading && !skillCardsList?.length) {
			fetchCards();
		}
	}, [fetchCards, isLoading, skillCardsList]);

	const formattedSkillCards = React.useMemo(() => {
		let filterredList = filterCardByDomain(skillCardsList, activeDomains);

		if (typeof targetHomebrewStatus === "string") {
			filterredList = filterCardByHomebrew(
				filterredList,
				!!targetHomebrewStatus
			);
		}

		return sortSkillCard(filterredList, activeSort);
	}, [activeDomains, activeSort, skillCardsList, targetHomebrewStatus]);

	return (
		<>
			<div className={styles.filtersContainer}>
				<label>
					<span>Domain filter: </span>
					<Select
						className={styles.domainFilter}
						mode="multiple"
						placeholder="All Domains"
						onChange={handleDomainChange}
						defaultValue={activeDomains}
						options={domainOptions}
						allowClear
					/>
				</label>

				<label>
					<span>Card sort: </span>
					<Select
						defaultValue={activeSort}
						options={sortOptions}
						onChange={handleSortChange}
					/>
				</label>

				<label>
					<span>Card type: </span>
					<Select
						value={targetHomebrewStatus}
						options={homebrewOptions}
						onChange={handleHomebrewChange}
						disabled={!fbUser}
					/>
				</label>
			</div>

			<h2 className={styles.title}>Cards list</h2>

			<section className={styles.cardsContainer}>
				{!formattedSkillCards.length ? (
					isLoading ? (
						<LoadingOutlined />
					) : (
						<h4>No cards in this list</h4>
					)
				) : (
					formattedSkillCards.map((card, index) => (
						<Card key={index} card={card} hoverEffect preventEdit />
					))
				)}
			</section>
			<ModalCardFocus />
		</>
	);
};
