import styles from './Banner.module.css';
import banner from '../../img/logo-color.png';

function BannerPurple() {
    return (
        <div className={styles.bannerBox}>
            <img src={banner} alt="researcherBanner" className={styles.banner}></img>
        </div>
    );
}

export { BannerPurple };
