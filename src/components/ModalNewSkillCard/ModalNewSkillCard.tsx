import React from "react";
import { AssetType, CardType, Domain, SkillCard } from "@/shared/types";
import { Input, Modal } from "..";
import { useRecoilState } from "recoil";
import { skillCardsListState } from "@/shared/state";
import { getCardAssetUrl, saveStorage } from "@/shared/utils";

import styles from "./ModalNewSkillCard.module.scss";
import { DESCRIPTION_MAX_SIZE } from "@/shared/constants";

export type ModalNewSkillCardProps = {
	isOpen: boolean;
	setIsOpen: (param: boolean) => void;
};

export const ModalNewSkillCard: React.FC<ModalNewSkillCardProps> = ({
	isOpen,
	setIsOpen,
}) => {
	const [skillCardsList, setSkillCardsList] =
		useRecoilState(skillCardsListState);
	const handleClose = () => {
		setIsOpen(false);
	};
	const [descriptionLength, setDescriptionLength] = React.useState(0);

	const handleDescriptionChange = ({
		target,
	}: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setDescriptionLength(target.value.length);
	};

	const getNewCardId = (card: SkillCard) => {
		const baseId = `${card.domain}-${card.level}-`;
		const totalCardsLevel = skillCardsList.filter((skillCard) => {
			return skillCard.id.includes(baseId);
		}).length;

		return `${baseId}${totalCardsLevel + 1}`;
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const { currentTarget: form } = event;
		const { cardTitle, image, type, level, recall, description, domain } = form;

		const card: SkillCard = {
			id: "",
			title: cardTitle.value,
			imageUrl: image?.value || getCardAssetUrl(domain.value, AssetType.Image),
			type: type.value,
			domain: domain.value,
			level: level.value,
			recall: recall.value,
			description: description.value,
			isHomebrew: true,
		};

		card.id = getNewCardId(card);

		const newList = [...skillCardsList, card] as SkillCard[];

		saveStorage("skillCardsList", newList, {
			needParse: true,
		});

		setSkillCardsList(newList);

		handleClose();
	};
	return (
		<Modal
			className={styles.newCardModal}
			isModalOpen={isOpen}
			setModalOpen={setIsOpen}
		>
			<form onSubmit={handleSubmit} className={styles.cardForm}>
				<p>
					<Input
						label="Card title"
						name="cardTitle"
						placeholder="Card's name"
						required
					/>
				</p>

				<p>
					<Input
						label="Card image (optional)"
						name="image"
						placeholder="Image URL"
					/>
				</p>

				<p>
					<label>
						<span>Type</span>
						<select name="type" required>
							{Object.entries(CardType).map(([key, value]) => (
								<option key={key} value={value}>
									{key}
								</option>
							))}
						</select>
					</label>

					<label>
						<span>Domain</span>
						<select name="domain" defaultValue="" required>
							<option value="" disabled>
								Select domain
							</option>
							{Object.entries(Domain).map(([key, value]) => (
								<option key={key} value={value}>
									{key}
								</option>
							))}
						</select>
					</label>
				</p>

				<p className={styles.levelsRow}>
					<Input
						label="Card level"
						name="level"
						title="Card's level"
						type="number"
						defaultValue={1}
						min={0}
						max={10}
						required
					/>

					<Input
						label="Recall cost"
						name="recall"
						title="Cost to recall into loadout"
						type="number"
						defaultValue={0}
						min={0}
						max={10}
						required
					/>
				</p>

				<p>
					<Input
						containerClassName={styles.description}
						label={
							<span>
								Card description{" "}
								{`[${DESCRIPTION_MAX_SIZE - descriptionLength}]`}
							</span>
						}
						name="description"
						type="textarea"
						placeholder="Card's text"
						maxLength={DESCRIPTION_MAX_SIZE}
						onChange={handleDescriptionChange}
						required
					/>
				</p>

				<div className={styles.btnContainer}>
					<button type="submit">Submit</button>
					<button type="reset" onClick={handleClose}>
						Cancel
					</button>
				</div>
			</form>
		</Modal>
	);
};
