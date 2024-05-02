import React from "react";
import styles from "./ToggableSection.module.scss";

export type ToggableSectionProps = {
	title: React.ReactNode | string;
	children: React.ReactNode;
	containerClassName?: string;
	className?: string;
	style?: React.CSSProperties;
	defaultOpen?: boolean;
	hideMarker?: boolean;
};

export const ToggableSection: React.FC<ToggableSectionProps> = ({
	title,
	children,
	containerClassName = "",
	className = "",
	style = {},
	defaultOpen = false,
	hideMarker = false,
}) => {
	const [isOpen, setIsOpen] = React.useState(defaultOpen);

	const toggleOpen = (openState?: boolean) => {
		const nextState = typeof openState === "boolean" ? openState : !isOpen;

		setIsOpen(nextState);
	};

	return (
		<section
			className={`${styles.section} ${containerClassName}`}
			style={style}
		>
			<div onClick={() => toggleOpen()} className={styles.titleContainer}>
				{!hideMarker && (
					<span
						className={`${styles.titleMarker} ${
							isOpen ? styles.openMarker : ""
						}`}
					>
						&#9654;
					</span>
				)}
				{typeof title === "string" ? <h4>{title}</h4> : title}
			</div>

			<div
				className={`${styles.content} ${className} ${
					isOpen ? "" : styles.closed
				}`}
			>
				{children}
			</div>
		</section>
	);
};
