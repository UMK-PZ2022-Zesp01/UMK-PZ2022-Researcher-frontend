import { createUseStyles } from 'react-jss';

export default createUseStyles({
  researchTile: {
    position: 'relative',
    height: '350px',

    backgroundColor: 'green',
    borderRadius: '5px',

    transition: 'transform 0.2s ease-in-out, -webkit-box-shadow 0.2s ease-in-out',

    listStyleType: 'none',
    '-webkit-box-shadow': '5px 5px 20px 0px rgba(66, 68, 90, 1)',
    '-moz-box-shadow': '5px 5px 20px 0px rgba(66, 68, 90, 1)',
    boxShadow: '5px 5px 20px 0px rgba(66, 68, 90, 1)',

    '&:hover': {
      transform: 'scale(1.02)',
    },
  },

  previewed: {
    '-webkit-box-shadow': '8px 8px 23px 3px rgba(109, 59, 158, 1)',
    '-moz-box-shadow': '8px 8px 23px 3px rgba(109, 59, 158, 1)',
    boxShadow: '8px 8px 23px 3px rgba(109, 59, 158, 1)',
  },

  tileOverlay: {
    position: 'absolute',
    bottom: '0',
    left: '0',

    width: '100%',
    height: '30%',
    padding: '1rem',
    borderBottomRightRadius: '5px',
    borderBottomLeftRadius: '5px',

    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white',

    textAlign: 'left',
  },

  tileOverlayTitle: {
    height: '1.4rem',
    width: '100%',
    fontWeight: '700',
    fontSize: '1rem',
    margin: '0.2rem',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },

  tileOverlayAuthor: {
    height: '1.4rem',
    fontWeight: '300',
    fontSize: '1rem',
    margin: '0.1rem',
  },
  tileOverlayDate: {
    height: '1.4rem',
    fontWeight: '300',
    fontSize: '1rem',
    margin: '0.1rem',
  },

  previewTile: {
    display: 'flex',
    flexDirection: 'column',
    gridColumn: '1/-1',

    height: 0,
    borderRadius: '5px',

    backgroundColor: 'rgb(246,226,255)',

    overflow: 'hidden',

    fontWeight: '400',

    transition: 'height 0.3s ease-in-out',

    '-webkit-box-shadow': '8px 8px 23px 3px rgba(109, 59, 158, 1)',
    '-moz-box-shadow': '8px 8px 23px 3px rgba(109, 59, 158, 1)',
    boxShadow: '8px 8px 23px 3px rgba(109, 59, 158, 1)',
  },

  previewVisible: {
    height: '400px',
  },

  previewLevel1: {
    display: 'flex',
    flexDirection: 'row',

    width: '100%',
    height: '3.5rem',

    backgroundColor: '#512C8C',
    color: 'white',
  },

  previewLevel2: {
    display: 'flex',
    flexDirection: 'row',

    width: '100%',
    height: '3.5rem',

    backgroundColor: '#C6B1E7',
  },

  previewLevel3: {
    display: 'flex',
    flexDirection: 'row',

    width: '100%',
    backgroundColor: '#F4F0FA',
  },

  headerLevelLeft: {
    padding: '0.5rem 1rem',
    width: '50%',

    textAlign: 'left',
  },

  headerLevelRight: {
    padding: '0.5rem 1rem',
    width: '50%',

    textAlign: 'right',
  },

  bodyLevelLeft: {
    padding: '0.5rem 1rem',
    width: '30%',
    textAlign: 'left',
  },
  bodyLevelRight: {
    padding: '0.5rem 1rem',
    width: '70%',
    textAlign: 'left',
  },

  left: {
    textAlign: 'left',
  },

  right: {
    textAlign: 'right',
  },
});
