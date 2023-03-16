import { createUseStyles } from 'react-jss';

export default createUseStyles({
  mainPage: {
    maxWidth: '900px',
    margin: '100px auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  logo: {
    backgroundColor: '#512C8C',
    padding: '10px 15px',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    transition: 'background-color .5s',

    '&:hover': {
      backgroundColor: '#6D3B9E',
    },
  },

  logoImg: {
    height: '40px',
  },

  bookmarksContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
  },

  mainPagePanel: {
    width: '100%',
    padding: '50px',
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    borderRadius: '10px',
    backgroundColor: '#F4F0FA',
  },

  tileGrid: {
    display: 'grid',

    width: '100%',
    gap: '0.5rem 1rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))',

    gridAutoFlow: 'dense',
  },
});
