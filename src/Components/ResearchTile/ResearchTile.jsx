import React from 'react';
import ResearchTileStyle from './ResearchTileStyle';

export default function ResearchTile({ tileData, postData }) {
  const styles = ResearchTileStyle();

  const { tileNumber, previewed, setPreviewed } = tileData;
  const {
    poster,
    title,
    author,
    description,

    location,

    begDate,
    endDate,

    highlight,

    requirements,
    rewards,
  } = postData;

  const isPreviewed = previewed === tileNumber;

  const translate = {
    author: 'Autor',
    poster: 'Poster',
    title: 'Tytuł badania',
    description: 'Opis badania',

    gender: 'Płeć',
    place: 'Miejsce zamieszkania',
    education: 'Wykształcenie',
    marital: 'Stan cywilny',

    cash: 'Pieniądze',
    item: 'Upominek',
  };

  const handleTileClicked = () => {
    if (isPreviewed) {
      setPreviewed(null);
      return;
    }
    setPreviewed(tileNumber);
  };

  const renderInfo = (array = []) => {
    return [...array].map(item => (
      <>
        <span key={`${item.type} ${item.value}`} className={styles.bold}>
          {`${translate[item.type.toLowerCase()]}: `}
        </span>
        {item.value} {item.type.toLowerCase() === 'cash' ? 'zł' : ''}
        <br />
      </>
    ));
  };

  return (
    <>
      {/*SMALL TILE*/}
      <li
        className={`${isPreviewed ? styles.previewed : ''} ${styles.researchTile} `}
        onClick={handleTileClicked}
      >
        <img className={styles.poster} alt={'poster'} src={`data:image/jpeg;base64,${poster}`} />
        <div className={styles.tileOverlay}>
          <p className={styles.tileOverlayTitle}>{title}</p>
          <p className={styles.tileOverlayAuthor}>{author}</p>
          <p className={styles.tileOverlayDate}>otwarte do: {endDate}</p>
        </div>
      </li>

      {/*BIG TILE*/}
      <li className={`${styles.previewTile} ${isPreviewed ? styles.previewVisible : ''}`}>
        <div className={styles.previewHeader1}>
          <header className={`${styles.headerHalf} ${styles.headerLeft}`}>{title}</header>
          <div className={`${styles.headerHalf} ${styles.headerRight}`}>
            Otwarte do:
            <br /> {endDate}
          </div>
        </div>
        <div className={styles.previewHeader2}>
          <div className={`${styles.headerHalf} ${styles.headerLeft}`}>{author}</div>
          <div className={`${styles.headerHalf} ${styles.headerRight}`}>{highlight}</div>
        </div>
        <div className={styles.previewBody}>
          <div className={`${styles.bodyPart} ${styles.bodyLeft}`}>
            <div className={styles.infoBox}>
              <div className={styles.h4}>Dostęp</div>
              <b className={styles.bold}>Forma: </b>{' '}
              {location.form.toLowerCase() === 'remote' ? 'zdalnie' : 'na miejscu'}
              <br />
              <b className={styles.bold}>Adres: </b> {location.address}
            </div>
            <div className={styles.infoBox}>
              <div className={styles.h4}>Wymagania</div>
              {renderInfo(requirements)}
            </div>
            <div className={styles.infoBox}>
              <div className={styles.h4}>Nagrody za udział</div>
              {renderInfo(rewards)}
            </div>
          </div>
          <main className={`${styles.bodyPart} ${styles.bodyRight}`}>
            <div className={styles.h4}>Opis badania:</div>
            <main>{description}</main>
          </main>
        </div>
        <div className={styles.previewButtonContainer}>
          <button className={styles.researchPageButton}>STRONA BADANIA</button>
        </div>
        <div className={styles.previewRollInContainer}>
          <button onClick={handleTileClicked} className={styles.rollInButton}></button>
        </div>
      </li>
    </>
  );
}

ResearchTile.defaultProps = {
  tileData: {
    tileNumber: null,
    previewed: false,
  },

  postData: {
    poster: '',
    title: '',
    description: '',
    author: '',

    begDate: '',
    endDate: '',

    location: {
      form: '',
      address: '',
    },

    rewards: [],
    requirements: [],

    highlight: '',
  },
};
