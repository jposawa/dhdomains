import React from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";
import {
	filterCardByDomain,
	filterCardByHomebrew,
	loadStorage,
	sortSkillCard,
} from "@/shared/utils";
import { Card, ModalCardFocus } from "@/components";
import { useRecoilState } from "recoil";
import { skillCardsListState } from "@/shared/state";
import { SYSTEM_SKILL_CARDS } from "@/shared/constants";

import styles from "./SkillCardManager.module.scss";
import { Domain, SkillCard } from "@/shared/types";

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

const homebrewOptions: SelectProps["options"] = [
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

export const SkillCardManager = () => {
	const [skillCardsList, setSkillCardsList] =
		useRecoilState(skillCardsListState);
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

	React.useEffect(() => {
		setSkillCardsList(loadStorage("skillCardsList", { needParse: true }) || []);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const formattedSkillCards = React.useMemo(() => {
		const unifiedList = [
			...Object.values(SYSTEM_SKILL_CARDS),
			...skillCardsList,
		];
		let filterredList = filterCardByDomain(unifiedList, activeDomains);

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
						defaultValue={targetHomebrewStatus}
						options={homebrewOptions}
						onChange={handleHomebrewChange}
					/>
				</label>
			</div>

			<h2 className={styles.title}>Cards list</h2>

			<section className={styles.cardsContainer}>
				{!formattedSkillCards.length ? (
					<h4>No cards in this list</h4>
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
