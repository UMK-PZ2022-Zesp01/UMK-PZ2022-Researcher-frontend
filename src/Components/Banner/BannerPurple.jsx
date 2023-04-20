import styles from './Banner.module.css';
import banner from '../../img/logo-color.png';

function BannerPurple() {
    return (
        <div class={styles.bannerBox}>
            <img src={banner} alt="researcherBanner" class={styles.banner}></img>
        </div>
    );
}

export { BannerPurple };
