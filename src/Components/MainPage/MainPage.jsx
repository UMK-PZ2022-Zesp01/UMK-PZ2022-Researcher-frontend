import React, { useRef } from 'react';
import MainPageStyle from './MainPageStyle';
import { useEffect } from 'react';
import getApiUrl from '../../Common/Api';
import useLogout from '../../hooks/useLogout';
import { useUsername } from '../../hooks/useAuth';
import ResearchTile from '../ResearchTile/ResearchTile';
import BookmarksNav from '../BookmarksNav/BookmarksNav';
import banner from '../../img/banner2.png';

const RESEARCHES_URL = getApiUrl() + 'researches';

function MainPage() {
  const styles = MainPageStyle();
  const [username, setUsername] = React.useState(useUsername());
  const logout = useLogout();
  const [posts, setPosts] = React.useState([]);
  const [previewed, setPreviewed] = React.useState(null);

  // const previewedRef = useRef(null);
  //
  // useEffect(() => {
  //   if (previewed !== null)
  //     previewedRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  // }, [previewed]);

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

  const signOut = async () => {
    await logout();
    setUsername('');
  };

  const showPosts = () => {
    return posts.map((post, index) => <ResearchTile></ResearchTile>);
  };

  return (
    <div className={styles.mainPage}>
      <div className={styles.bookmarksContainer}>
        <a href="/" className={styles.logo}>
          <img className={styles.logoImg} src={banner} alt="Researcher Logo" />
        </a>
        <BookmarksNav />
      </div>
      <main className={styles.mainPagePanel}>
        <ul className={styles.tileGrid}>
          {/*{showPosts()}*/}
          <ResearchTile
            tileData={{
              previewed: previewed,
              setPreviewed: setPreviewed,
              tileNumber: 1,
            }}
            postData={{
              author: 'Maciej Andrzej',
              title: 'Badanie testowe, weź to obczaj lepiej.',
              endDate: '2023-04-15',
              locationForm: 'remote',
              address: 'cfel.pl',
            }}
          ></ResearchTile>
          <ResearchTile
            tileData={{
              previewed: previewed,
              setPreviewed: setPreviewed,
              tileNumber: 2,
            }}
            postData={{ title: 2 }}
          ></ResearchTile>
          <ResearchTile
            tileData={{
              previewed: previewed,
              setPreviewed: setPreviewed,
              tileNumber: 3,
            }}
            postData={{ title: 3 }}
          ></ResearchTile>
          <ResearchTile
            tileData={{
              previewed: previewed,
              setPreviewed: setPreviewed,
              tileNumber: 4,
            }}
            postData={{ title: 4 }}
          ></ResearchTile>
          <ResearchTile
            tileData={{
              previewed: previewed,
              setPreviewed: setPreviewed,
              tileNumber: 5,
            }}
            postData={{ title: 5 }}
          ></ResearchTile>
          <ResearchTile
            tileData={{
              previewed: previewed,
              setPreviewed: setPreviewed,
              tileNumber: 6,
            }}
            postData={{ title: 6 }}
          ></ResearchTile>
          <ResearchTile
            tileData={{
              previewed: previewed,
              setPreviewed: setPreviewed,
              tileNumber: 7,
            }}
            postData={{ title: 7 }}
          ></ResearchTile>
          <ResearchTile
            tileData={{
              previewed: previewed,
              setPreviewed: setPreviewed,
              tileNumber: 8,
            }}
            postData={{ title: 8 }}
          ></ResearchTile>
          <ResearchTile
            tileData={{
              previewed: previewed,
              setPreviewed: setPreviewed,
              tileNumber: 9,
            }}
            postData={{ title: 9 }}
          ></ResearchTile>
          <ResearchTile
            tileData={{
              previewed: previewed,
              setPreviewed: setPreviewed,
              tileNumber: 10,
            }}
            postData={{ title: 10 }}
          ></ResearchTile>
          <ResearchTile
            tileData={{
              previewed: previewed,
              setPreviewed: setPreviewed,
              tileNumber: 11,
            }}
            postData={{ title: 11 }}
          ></ResearchTile>
          <ResearchTile
            tileData={{
              previewed: previewed,
              setPreviewed: setPreviewed,
              tileNumber: 12,
            }}
            postData={{ title: 12 }}
          ></ResearchTile>
          <ResearchTile
            tileData={{
              previewed: previewed,
              setPreviewed: setPreviewed,
              tileNumber: 13,
            }}
            postData={{ title: 13 }}
          ></ResearchTile>
        </ul>
      </main>
    </div>
  );
}

export default MainPage;
