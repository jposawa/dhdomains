import { AssetType, Domain, SkillCard } from "@/shared/types";
import { CardDivider } from "./";

import styles from "./CardHeader.module.scss";
import React from "react";
import { getCardAssetUrl } from "@/shared/utils";

const BLACK_TEXT_DOMAINS = [Domain.Bone];

export type CardHeaderProps = {
	card: SkillCard;
	className?: string;
};

export const CardHeader: React.FC<CardHeaderProps> = ({
	card,
	className = "",
}) => {
	const imgUrl =
		card?.imageUrl || getCardAssetUrl(card?.domain, AssetType.Image);

	return (
		<section
			className={styles.cardHeader}
			style={
				{
					"--textColor": BLACK_TEXT_DOMAINS.includes(card?.domain)
						? "#111"
						: "#eee",
				} as React.CSSProperties
			}
		>
			<div className={styles.bannerContainer}>
				<span>{card?.level}</span>
				<img
					className={styles.banner}
					alt="domain banner"
					src={getCardAssetUrl(card?.domain, AssetType.Banner)}
				/>
			</div>

			<div className={styles.recallContainer}>
				<span className={styles.innerCircle}>
					{0}
					<span className={styles.bolt} />
				</span>
			</div>

			<div className={`${styles.imgContainer} ${className}`}>
				<img alt="domain emblem" src={imgUrl} />
			</div>

			<CardDivider card={card} />
		</section>
	);
};
