import { createUseStyles } from 'react-jss';

export default createUseStyles({

  container: {
    maxWidth: '900px',
    margin: '100px auto',
    display: 'flex',
    flexDirection: 'column',
  },

  bookmarks: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: '5px'
  },

  bookmarkItem: {
    backgroundColor: '#512C8C',
    color: '#FFF',
    padding: '20px',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    '&:hover': {
      backgroundColor: '#6D3B9E'
    }
  },


  createResearchPanel: {
    width: '100%',
    padding: '50px',
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    justifyContent: 'space-evenly',
    borderRadius: '10px',
    backgroundColor: '#F4F0FA',
  }
});

