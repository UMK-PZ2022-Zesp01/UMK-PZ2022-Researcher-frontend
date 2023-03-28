import styles from './Banner.module.css';
import banner from '../../img/banner2.png';
import { Link } from 'react-router-dom';

function BannerWhite() {
    return (
        <Link to="/" className={styles.bannerBox}>
            <img src={banner} alt="researcherBanner" className={styles.banner}></img>
        </Link>
    );
}

export { BannerWhite };
