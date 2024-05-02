import { CardHeader, CardBody } from "./";
import { SkillCard } from "@/shared/types";
import { useSetRecoilState } from "recoil";
import { selectedSkillCardState } from "@/shared/state";

import styles from "./Card.module.scss";

export type CardProps = {
	card: SkillCard;
	className?: string;
	baseWidth?: string;
	isFlipped?: boolean;
	hoverEffect?: boolean;
  preventEdit?: boolean;
};

export const Card: React.FC<CardProps> = ({
	card,
	className = "",
	baseWidth = "20rem",
	isFlipped = false,
	hoverEffect = false,
  preventEdit = false,
}) => {
	const setSelectedSkillCard = useSetRecoilState(selectedSkillCardState);

	const handleClick = (event: React.PointerEvent<HTMLDivElement>) => {
		event.preventDefault();

		setSelectedSkillCard(card);
	};

	return (
		<div
			className={`${styles.card} ${className} ${
				isFlipped ? styles.flipped : ""
			} ${hoverEffect ? styles.hoverEffect : ""}`}
			style={
				{
					"--baseWidth": baseWidth,
				} as React.CSSProperties
			}
			onDoubleClick={handleClick}
			onContextMenu={handleClick}
		>
			<CardHeader card={card} />

			<CardBody card={card} preventEdit={preventEdit}/>
		</div>
	);
};
