import React from "react";
import { useRecoilState } from "recoil";
import { Input } from "../";
import {
	editModeState,
	selectedSkillCardState,
	skillCardsListState,
} from "@/shared/state";
import { SkillCard } from "@/shared/types";

import styles from "./CardBody.module.scss";
import { CheckOutlined } from "@ant-design/icons";
import { cloneObj, saveStorage } from "@/shared/utils";
import { DESCRIPTION_MAX_SIZE } from "@/shared/constants";

export type CardBodyProps = {
	card: SkillCard;
	preventEdit?: boolean;
};

export const CardBody: React.FC<CardBodyProps> = ({
	card,
	preventEdit = false,
}) => {
	const [selectedSkillCard, setSelectedSkillCard] = useRecoilState(
		selectedSkillCardState
	);
	const [isEditMode, setIsEditMode] = useRecoilState(editModeState);
	const [skillCardsList, setSkillCardsList] =
		useRecoilState(skillCardsListState);
	const [descriptionLength, setDescriptionLength] = React.useState(0);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const { currentTarget: form } = event;
		const newCard = cloneObj(selectedSkillCard);
		const newList = cloneObj(skillCardsList);
		const cardIndex = skillCardsList.findIndex((c) => c.id === newCard.id);

		newCard.title = form.cardTitle.value;
		newCard.description = form.description.value;

		newList[cardIndex] = newCard;
		saveStorage("skillCardsList", newList, {
			needParse: true,
		});

		setSkillCardsList(newList);
		setSelectedSkillCard(newCard);
		setIsEditMode(false);
	};

	const handleReset = () => {
		setIsEditMode(false);
	};

	const handleDescriptionChange = ({
		target,
	}: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setDescriptionLength(target.value.length);
	};

	const formattedDescription = React.useMemo(() => {
		if (!card?.description) {
			return "";
		}

		const formatted = card.description.replace(/\*([^*]+)\*/g, "<b>$1</b>");

		return formatted;
	}, [card]);

	React.useEffect(() => {
		if (!isEditMode && selectedSkillCard) {
			setDescriptionLength(selectedSkillCard.description.length);
		}
	}, [isEditMode, selectedSkillCard]);

	return (
		<section className={styles.cardBody}>
			{isEditMode && selectedSkillCard?.id === card?.id && !preventEdit ? (
				<form
					className={styles.formContainer}
					onSubmit={handleSubmit}
					onReset={handleReset}
				>
					<Input
						name="cardTitle"
						defaultValue={card.title.toUpperCase()}
						required
					/>

					<Input
						label={
							<span>{`[${DESCRIPTION_MAX_SIZE - descriptionLength}]`}</span>
						}
						type="textarea"
						name="description"
						defaultValue={card.description}
						placeholder="Card's text"
						maxLength={DESCRIPTION_MAX_SIZE}
						onChange={handleDescriptionChange}
						required
					/>

					<div className={styles.buttonContainer}>
						<button title="confirm changes" type="submit">
							<CheckOutlined />
						</button>
					</div>
				</form>
			) : (
				<>
					<h3 className={styles.title}>{card.title.toUpperCase()}</h3>

					<div
						className={styles.description}
						dangerouslySetInnerHTML={{ __html: formattedDescription }}
					/>
				</>
			)}
		</section>
	);
};
