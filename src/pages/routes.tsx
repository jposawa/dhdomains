import { Routes as Switch, Route } from "react-router-dom";
import { Home } from ".";

export const Routes = () => {
	return (
		<Switch>
			<Route index path="/" element={<Home />} />

			<Route path="/home" element={<Home />} />
		</Switch>
	);
};
