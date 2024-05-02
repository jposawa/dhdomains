import { AssetType, SkillCard } from "@/shared/types";
import styles from "./CardDivider.module.scss";
import { getCardAssetUrl } from "@/shared/utils";

export type CardDividerProps = {
	card: SkillCard;
};

export const CardDivider: React.FC<CardDividerProps> = ({ card }) => {
	return (
		<section className={styles.dividerContainer}>
			<span className={styles.divider} />
			<span className={styles.cardType}>
				<img
					alt="card base"
					className={styles.cardBase}
					src="/assets/card/CardBase.png"
				/>
				<img
					alt="type base"
					className={`${styles.typeBox} ${styles[card?.domain]}`}
					src={getCardAssetUrl(card.domain, AssetType.Box)}
				/>
				<b>{card.type.toUpperCase()}</b>
			</span>
		</section>
	);
};
