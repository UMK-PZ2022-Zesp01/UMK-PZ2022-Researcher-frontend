import React from 'react';
import ResearchTileStyle from './ResearchTileStyle';

export default function ResearchTile({ tileData, postData }) {
  const styles = ResearchTileStyle();

  const { tileNumber, previewed, setPreviewed } = tileData;
  const {
    researchImage,
    locationForm,
    address,
    title,
    begDate,
    endDate,
    author,
    highlight,
    researchText,
    requirements,
    rewards,
  } = postData;

  const isPreviewed = previewed === tileNumber;

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
        <b key={`${item?.type} ${item?.value}`} className={styles.bold}>
          {`${item?.type}: `}
        </b>
        {item?.value} {item?.type === 'Piniendze' ? 'zł' : ''}
        <br />
      </>
    ));
  };

  return (
    <>
      {/*SMALL TILE*/}
      <li
        className={`${styles.researchTile} ${isPreviewed ? styles.previewed : ''}`}
        onClick={handleTileClicked}
      >
        <img
          className={styles.poster}
          alt={'poster'}
          src={`data:image/jpeg;base64,${researchImage}`}
        />
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
              {locationForm === 'Remote' ? 'zdalnie' : 'na miejscu'}
              <br />
              <b className={styles.bold}>Adres: </b> {address}
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
          <article className={`${styles.bodyPart} ${styles.bodyRight}`}>{researchText}</article>
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
    researchImage: '',
    locationForm: '',
    address: '',

    title: '',
    begDate: '',
    endDate: '',

    author: '',
    highlight: '',

    researchText: '',
    requirements: [],
    rewards: [],
  },
};
