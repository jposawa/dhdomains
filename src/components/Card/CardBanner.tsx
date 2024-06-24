import styles from "./CardBanner.module.scss";

export const CardBanner = () => {
  return (
    <div className={styles.cardBannerContainer}>
      <div className={styles.coreBanner}>
        <span className={`${styles.halfCore}`} />
      </div>
    </div>
  )
}