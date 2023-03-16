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

  return (
    <>
      {/*SMALL TILE*/}
      <li
        className={`${styles.researchTile} ${isPreviewed ? styles.previewed : ''}`}
        onClick={handleTileClicked}
      >
        <img src={researchImage} />
        <div className={styles.tileOverlay}>
          <p className={styles.tileOverlayTitle}>{title}</p>
          <p className={styles.tileOverlayAuthor}>{author}</p>
          <p className={styles.tileOverlayDate}>otwarte do: {endDate}</p>
        </div>
      </li>

      {/*BIG TILE*/}
      <li className={`${styles.previewTile} ${isPreviewed ? styles.previewVisible : ''}`}>
        <div className={styles.previewLevel1}>
          <div className={styles.headerLevelLeft}>{title}</div>
          <div className={styles.headerLevelRight}>
            Otwarte do:
            <br /> {endDate}
          </div>
        </div>
        <div className={styles.previewLevel2}>
          <div className={styles.headerLevelLeft}>{author}</div>
          <div className={styles.headerLevelRight}>{highlight}</div>
        </div>
        <div className={styles.previewLevel3}>
          <div className={styles.bodyLevelLeft}>
            <h5>Dostęp</h5>
            <b>Forma: </b>
            {locationForm}
            <br />
            <b>Adres: </b> {address}
            <h5>Wymagania</h5>
            <h5>Nagrody za udział</h5>
          </div>
          <div className={styles.bodyLevelRight}>{researchText}</div>
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
    requirements: {
      age: '',
      gender: '',
    },
    rewards: {},
  },
};
