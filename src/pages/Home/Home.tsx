import React from "react";
import { SkillCardManager } from "@/fragments";
import { ModalNewSkillCard } from "@/components";

import styles from "./Home.module.scss";
import { useRecoilState, useRecoilValue } from "recoil";
import { fbAppState, fbUserState, isAuthLoadingState } from "@/shared/state";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { LoadingOutlined } from "@ant-design/icons";

export const Home = () => {
	const [isNewSkillOpen, setNewSkillOpen] = React.useState(false);
	const fbApp = useRecoilValue(fbAppState);
	const [fbUser] = useRecoilState(fbUserState);
	const isAuthLoading = useRecoilValue(isAuthLoadingState);

	const handleSignIn = React.useCallback(() => {
		if (fbApp) {
			const provider = new GoogleAuthProvider();
			const auth = getAuth();

			signInWithPopup(auth, provider);
		}
	}, [fbApp]);

	return (
		<>
			<h1>Home</h1>
			{isAuthLoading ? (
				<span>
					<LoadingOutlined />
				</span>
			) : fbUser?.uid ? (
				<button
					className={styles.addBtn}
					type="button"
					onClick={() => {
						setNewSkillOpen(true);
					}}
				>
					+ Add card
				</button>
			) : (
				<button
					className={styles.signInBtn}
					type="button"
					onClick={handleSignIn}
				>
					Google Sign in
				</button>
			)}
			<ModalNewSkillCard isOpen={isNewSkillOpen} setIsOpen={setNewSkillOpen} />
			<SkillCardManager />
		</>
	);
};
