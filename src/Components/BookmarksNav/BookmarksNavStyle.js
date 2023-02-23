import { createUseStyles } from "react-jss";

export default createUseStyles({

  bookmarks: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: '10px'
  },

  activeBookmarkItem: {
    backgroundColor: '#F4F0FA',
    color: '#512C8C',
    padding: '20px',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px'
  },

  activeIcon: {
    fontSize: '20px'
  },

  activeIconDesc: {
    marginLeft: '10px',
    color: '#512C8C',
    fontWeight: 'bold'
  },

  bookmarkItem: {
    backgroundColor: '#512C8C',
    color: '#FFF',
    textDecoration: 'none',
    padding: '20px',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    '&:hover': {
      backgroundColor: '#6D3B9E',
      cursor: 'pointer',
    }
  },

  icon: {
    fontSize: '20px',
  },

  iconDesc: {
    marginLeft: '10px',
    fontWeight: 'bold'
  }

});