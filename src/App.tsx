import { useRecoilValue } from "recoil";
import { themeState } from "./shared/state";
import { Routes } from "./pages";

import styles from "./App.module.scss";
function App() {
	const theme = useRecoilValue(themeState);

	return (
		<main className={`${styles.appContainer} ${styles[theme]}`}>
			{/* <MainMenu /> */}

			<div className={styles.pageContainer}>
				<Routes />
			</div>
		</main>
	);
}

export default App;
