import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
	fbAppState,
	fbUserState,
	isAuthLoadingState,
	themeState,
} from "./shared/state";
import { Routes } from "./pages";
import { initializeApp } from "firebase/app";
import { FIREBASE_CONFIG } from "./shared/constants";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { cloneObj, loadStorage } from "./shared/utils";
import { useAuth } from "./shared/hooks";

import styles from "./App.module.scss";
import { LogoutOutlined } from "@ant-design/icons";
function App() {
	const theme = useRecoilValue(themeState);
	const [fbApp, setFbApp] = useRecoilState(fbAppState);
	const [fbUser, setFbUser] = useRecoilState(fbUserState);
	const [, setIsAuthLoading] = useRecoilState(isAuthLoadingState);
	const { syncUserData } = useAuth();

	const handleSignOut = React.useCallback(() => {
		if (!fbApp) {
			console.warn("Firebase app not found");
			return;
		}

		if (window.confirm("Are you sure you want to sign out?")) {
			const auth = getAuth();
			auth
				.signOut()
				.then(() => {
					console.log("Signing out");
				})
				.catch((error) => {
					console.error("Error on sign out", error);
				});
		}
	}, [fbApp]);

	React.useEffect(() => {
		if (!fbApp) {
			const app = initializeApp(FIREBASE_CONFIG);

			setFbApp(app);
		} else {
			const observer = onAuthStateChanged(getAuth(), (user) => {
				const synced = loadStorage("syncedUser");

				if (!!user && !synced) {
					syncUserData(user);
				}

				setFbUser(cloneObj(user));
			});

			setIsAuthLoading(false);
			return () => {
				observer();
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fbApp]);

	return (
		<main className={`${styles.appContainer} ${styles[theme]}`}>
			{/* <MainMenu /> */}

			{fbUser && (
				<div className={styles.logoutContainer}>
					<button
						onClick={handleSignOut}
						className={styles.btnLogout}
						type="button"
					>
						<LogoutOutlined />
						<span>Sign out</span>
					</button>
				</div>
			)}
			<div className={styles.pageContainer}>
				<Routes />
			</div>
		</main>
	);
}

export default App;
