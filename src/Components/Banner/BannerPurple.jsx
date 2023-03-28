import styles from './Banner.module.css';
import banner from '../../img/banner1.png';

function BannerPurple() {
    return (
        <div class={styles.bannerBox}>
            <img src={banner} alt="researcherBanner" class={styles.banner}></img>
        </div>
    );
}

export { BannerPurple };
