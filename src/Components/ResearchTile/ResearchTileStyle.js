import { createUseStyles } from 'react-jss';

export default createUseStyles({
  researchTile: {
    display: 'flex',
    position: 'relative',
    zIndex: '1',
    height: '350px',

    backgroundColor: '#512C8C',
    borderRadius: '5px',

    justifyContent: 'center',
    alignItems: 'center',

    transition: 'transform 0.2s ease-in-out, -webkit-box-shadow 0.2s ease-in-out',
    cursor: 'pointer',

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

  poster: {
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: '5px',
  },

  tileOverlay: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
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
    zIndex: '100',

    height: 0,
    borderRadius: '5px',

    overflow: 'hidden',
    textOverflow: 'ellipsis',

    fontWeight: '400',

    transition: 'all 0.4s ease-in-out',
    '-webkit-box-shadow': '0 0 0 0 rgba(109, 59, 158, 1)',
    '-moz-box-shadow': '0 0 0 0 rgba(109, 59, 158, 1)',
    boxShadow: '0 0 0 0 rgba(109, 59, 158, 1)',
  },

  previewVisible: {
    height: '30rem',
    '-webkit-box-shadow': '8px 8px 23px 3px rgba(109, 59, 158, 1)',
    '-moz-box-shadow': '8px 8px 23px 3px rgba(109, 59, 158, 1)',
    boxShadow: '8px 8px 23px 3px rgba(109, 59, 158, 1)',
  },

  previewHeader1: {
    display: 'flex',
    flexDirection: 'row',

    width: '100%',
    height: '3.5rem',
    padding: '0.5rem 1rem',

    backgroundColor: '#512C8C',
    color: 'white',
  },

  previewHeader2: {
    display: 'flex',
    flexDirection: 'row',

    width: '100%',
    height: '3.5rem',
    padding: '0.5rem 1rem',

    backgroundColor: '#C6B1E7',
  },

  previewBody: {
    display: 'flex',
    flexDirection: 'row',
    height: '16rem',

    width: '100%',
    backgroundColor: '#F4F0FA',
  },

  previewButtonContainer: {
    height: '5rem',
    padding: '1rem 0 ',
  },

  previewRollInContainer: {
    height: '2rem',
  },

  headerHalf: {
    display: 'flex',
    flexDirection: 'column',

    width: '50%',
    height: '2.5rem',

    textAlign: 'left',
    justifyContent: 'center',
  },

  headerLeft: {
    textAlign: 'left',
  },

  headerRight: {
    textAlign: 'right',
  },

  bodyPart: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0.5rem 1rem',

    height: '100%',
    textAlign: 'left',
    justifyContent: 'space-between',
  },

  bodyLeft: {
    width: '25%',
  },

  bodyRight: {
    width: '75%',
  },

  h4: {
    fontWeight: '700',
    fontSize: '1rem',
    color: '#6D3B9E',
  },

  bold: {
    fontWeight: '700',
    fontSize: 'inherit',
  },

  researchPageButton: {
    position: 'relative',
    zIndex: '0',

    padding: '0.7rem 3rem',
    margin: '0',
    backgroundColor: '#512C8C',

    color: '#ffffff',
    fontSize: '1rem',
    letterSpacing: '1px',
    fontWeight: '600',

    appearance: 'none',
    border: 'none',
    borderRadius: '5px',

    transition: 'translate linear 0.1s ',

    '&::before': {
      zIndex: '-1',
      position: 'absolute',
      content: '""',
      top: '0',
      left: '50%',
      width: '0',
      height: '100%',
      transition: 'width ease-in-out 0.3s, left ease-in-out 0.3s',
      borderRadius: '5px',
      backgroundColor: '#6D3B9E',
    },

    '&:hover': {
      cursor: 'pointer',
      '&::before': {
        width: '100%',
        left: '0',
      },
    },
    '&:active': {
      backgroundColor: '#512c8c',
      translate: '0 2px',
    },
  },

  rollInButton: {
    position: 'relative',
    zIndex: '0',

    width: '100%',
    height: '2rem',

    backgroundColor: '#C6B1E7',

    color: '#6D3B9E',
    fontWeight: '600',

    appearance: 'none',
    border: 'none',
    borderBottomRightRadius: '5px',
    borderBottomLeftRadius: '5px',

    transition: 'translate linear 0.1s ',

    backgroundImage:
      'linear-gradient(135deg, transparent 50%, #6D3B9E 50%),\r\n    linear-gradient(45deg, #6D3B9E 50%, transparent 50%),\r\n    linear-gradient(to right, transparent, transparent)',
    backgroundPosition: 'calc(50% - 4px),\r\n     calc(50% + 4px),\r\n    50%',
    backgroundSize: '8px 8px,\r\n    8px 8px,\r\n    2.5em 2.5em',
    backgroundRepeat: 'no-repeat',

    '&::before': {
      zIndex: '-1',
      position: 'absolute',
      content: '""',
      top: '0',
      left: '50%',
      width: '0',
      height: '100%',
      transition: 'width ease-in-out 0.3s, left ease-in-out 0.3s',
      borderBottomRightRadius: '5px',
      borderBottomLeftRadius: '5px',
      backgroundColor: '#F6E2FF',

      backgroundImage:
        'linear-gradient(135deg, transparent 50%, #6D3B9E 50%),\r\n    linear-gradient(45deg, #6D3B9E 50%, transparent 50%),\r\n    linear-gradient(to right,transparent, transparent)',
      backgroundPosition: 'calc(50% - 4px),\r\n     calc(50% + 4px),\r\n    50%',
      backgroundSize: '8px 8px,\r\n    8px 8px,\r\n    2.5em 2.5em',
      backgroundRepeat: 'no-repeat',
    },

    '&:hover': {
      cursor: 'pointer',
      '&::before': {
        width: '100%',
        left: '0',
      },
    },
    // '&:active': {
    //   backgroundColor: '#512c8c',
    //   translate: '0 2px',
    // },
  },
});
