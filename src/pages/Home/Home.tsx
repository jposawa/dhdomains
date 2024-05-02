import React from "react";
import { SkillCardManager } from "@/fragments";
import { ModalNewSkillCard } from "@/components";

import styles from "./Home.module.scss";

export const Home = () => {
	const [isNewSkillOpen, setNewSkillOpen] = React.useState(false);

	return (
		<>
			<h1>Home</h1>
			<button
        className={styles.addBtn}
				type="button"
				onClick={() => {
					setNewSkillOpen(true);
				}}
			>
				+ Add card
			</button>
			<ModalNewSkillCard isOpen={isNewSkillOpen} setIsOpen={setNewSkillOpen} />
			<SkillCardManager />
		</>
	);
};
