import styles from './Banner.module.css';
import banner from '../../img/banner2.png';

function BannerWhite() {
    return <img src={banner} alt="researcherBanner" className={styles.banner}></img>;
}

export { BannerWhite };
