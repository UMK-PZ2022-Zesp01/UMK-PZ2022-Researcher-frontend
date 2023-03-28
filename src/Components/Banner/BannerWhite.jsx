import styles from './Banner.module.css';
import banner from '../../img/banner2.png';

function BannerWhite() {
    return (
        <div className={styles.bannerBox}>
            <img src={banner} alt="researcherBanner" className={styles.banner}></img>
        </div>
    );
}

export default BannerWhite;
