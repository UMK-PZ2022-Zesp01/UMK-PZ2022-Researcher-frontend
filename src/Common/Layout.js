import { Outlet } from 'react-router-dom';
import styles from '../App.module.css';
import { Footer } from '../Components/Footer/Footer';

const Layout = () => {
    return (
        <main className={styles.App}>
            <div className={styles.divider}></div>
            <Outlet />
            <div className={styles.divider}></div>
            <Footer></Footer>
        </main>
    );
};
export default Layout;
