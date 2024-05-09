import { useRecoilState } from "recoil";
import { editModeState, selectedSkillCardState } from "@/shared/state";
import { Card, Modal } from "../";
import { DeleteOutlined, EditOutlined, UndoOutlined } from "@ant-design/icons";

import styles from "./ModalCardFocus.module.scss";
import { useDomainCard } from "@/shared/hooks";

export const ModalCardFocus = () => {
	const { isLoading, removeCard } = useDomainCard();
	const [selectedSkillCard, setSelectedSkillCard] = useRecoilState(
		selectedSkillCardState
	);
	const [isEditMode, setIsEditMode] = useRecoilState(editModeState);

	const closeModal = () => {
		setSelectedSkillCard(null);
	};

	const toggleEditMode = (isEdit?: boolean) => {
		setIsEditMode(isEdit || !isEditMode);
	};

	const handleCardDelete = () => {
		if (
			selectedSkillCard &&
			!isLoading &&
			window.confirm(
				"Are you sure you want to delete this card?\nThis action can't be undone"
			)
		) {
			removeCard(selectedSkillCard);
      closeModal();
		}
	};

	if (!selectedSkillCard) {
		return null;
	}

	return (
		<Modal
			className={styles.cardFocus}
			isModalOpen={!!selectedSkillCard}
			setModalOpen={closeModal}
		>
			<Card
				card={selectedSkillCard}
				baseWidth="min(90vmin, 25rem)"
				preventEdit={!selectedSkillCard.isHomebrew}
			/>
			{selectedSkillCard.isHomebrew && (
				<div className={styles.toolContainer}>
					<button
						title="Remove card"
						type="button"
						onClick={handleCardDelete}
						name="remove"
						className={styles.btnRemove}
					>
						<DeleteOutlined />
					</button>

					<button
						title={isEditMode ? "Reset changes" : "Edit mode"}
						type="button"
						onClick={() => toggleEditMode()}
						name={isEditMode ? "resetEdit" : "edit"}
					>
						{isEditMode ? <UndoOutlined /> : <EditOutlined />}
					</button>
				</div>
			)}
		</Modal>
	);
};
