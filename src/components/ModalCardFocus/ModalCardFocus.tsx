import { useRecoilState } from "recoil";
import { editModeState, selectedSkillCardState } from "@/shared/state";
import { Card, Modal } from "../";
import { EditOutlined, UndoOutlined } from "@ant-design/icons";

import styles from "./ModalCardFocus.module.scss";

export const ModalCardFocus = () => {
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
