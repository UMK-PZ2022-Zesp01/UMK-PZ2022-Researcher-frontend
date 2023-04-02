import React from 'react';
import styles from './MainPage.module.css';
import { useEffect } from 'react';
import getApiUrl from '../../Common/Api';
import { useUsername } from '../../hooks/useAuth';
import ResearchTile from '../ResearchTile/ResearchTile';
import { BookmarksNav } from '../BookmarksNav/BookmarksNav';
import banner from '../../img/banner2.png';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const RESEARCHES_URL = getApiUrl() + 'research/page/1/100';

function MainPage() {
    const [username, setUsername] = React.useState(useUsername());
    const [posts, setPosts] = React.useState([]);
    const [previewed, setPreviewed] = React.useState(null);

    console.log(posts);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const signal = controller.signal;

        const getPosts = async () => {
            try {
                await fetch(RESEARCHES_URL, {
                    signal,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json;charset:UTF-8',
                    },
                })
                    .then(response =>
                        response.json().then(result => {
                            isMounted && setPosts(result);
                        })
                    )
                    .catch(error => {
                        console.error(error);
                    });
            } catch (error) {
                console.error(error);
            }
        };

        getPosts();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);

    const cutText = (text, toLength) =>
        [...text].length > toLength ? text.substring(0, toLength) : text;

    const showPosts = () => {
        return posts.map((post, index) => (
            <ResearchTile
                key={post + index}
                tileData={{ previewed: previewed, setPreviewed: setPreviewed, tileNumber: index }}
                postData={post}
            ></ResearchTile>
        ));
    };

    return (
        <div className={styles.mainPage}>
            <Helmet>
                <title>Strona główna | Researcher</title>
            </Helmet>
            <div className={styles.bookmarksContainer}>
                <Link to="/" className={styles.logo}>
                    <img className={styles.logoImg} src={banner} alt="Researcher Logo" />
                </Link>
                <BookmarksNav active="home" />
            </div>
            <main className={styles.mainPagePanel}>
                <ul className={styles.tileGrid}>{showPosts()}</ul>
            </main>
        </div>
    );
}

export { MainPage };
