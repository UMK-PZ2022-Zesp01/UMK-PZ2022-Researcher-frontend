import styles from './Banner.module.css';
import banner from '../../img/logo-white.png';

function BannerWhite() {
    return <img src={banner} alt="researcherBanner" className={styles.banner}></img>;
}

export { BannerWhite };
