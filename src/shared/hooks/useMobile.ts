import React from "react";

export const useMobile = () => {
	const [isMobile, setIsMobile] = React.useState(false);

	const updateMobile = () => {
		const _isMobile = window.innerWidth < 900;

		setIsMobile(_isMobile);
	};

	React.useEffect(() => {
		window.addEventListener("resize", updateMobile);

		return () => {
			window.removeEventListener("resize", updateMobile);
		};
	});

	return {
		isMobile,
	};
};
