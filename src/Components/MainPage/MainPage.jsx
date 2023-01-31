import React from 'react';
import MainPageStyle from './MainPageStyle';
import { useEffect } from 'react';
import getApiUrl from '../../Common/Api';
import { useNavigate } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import useAuth from '../../hooks/useAuth';

function MainPage() {
  const { username } = useAuth().auth;
  const navigate = useNavigate();
  const logout = useLogout();
  const [posts, setPosts] = React.useState([]);
  const styles = MainPageStyle();

  const signOut = async () => {
    await logout();
    navigate('/', { replace: true });
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    const getPosts = async () => {
      try {
        await fetch(getApiUrl() + 'getAllResearches', {
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

  const showPosts = () => {
    return posts.map(post => <div key={post.id}>{post.title}</div>);
  };

  return (
    <article className={styles.mainPage}>
      <header>Witaj {username}!</header>
      {showPosts()}
      <button onClick={signOut}>Sign out</button>
    </article>
  );
}

export default MainPage;
