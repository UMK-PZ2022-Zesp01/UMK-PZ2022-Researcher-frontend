import { createUseStyles } from "react-jss";

export default createUseStyles({

  bookmarks: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: "10px"
  },

  activeBookmarkItem: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#F4F0FA",
    color: "#512C8C",
    padding: "20px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px"
  },

  activeIcon: {
    fontSize: "20px"
  },

  activeIconDesc: {
    marginLeft: "10px",
    color: "#512C8C",
    fontWeight: "bold"
  },

  bookmarkItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "60px",
    height: "64px",
    backgroundColor: "#512C8C",
    color: "#FFF",
    textDecoration: "none",
    padding: "20px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    transition: "max-width .5s",

    "&:hover": {
      backgroundColor: "#6D3B9E",
      cursor: "pointer",
      maxWidth: "185px"
    },

    "&:hover > $iconDesc": {
      opacity: 1
    },

    "&:not(:hover) > $iconDesc": {
      transition: "none"
    }

  },

  icon: {
    fontSize: "20px",
    pointerEvents: "none"
  },

  iconDesc: {
    fontWeight: "bold",
    marginLeft: "10px",
    pointerEvents: "none",
    opacity: 0,
    position: "relative",
    transition: ".25s linear",
    transitionDelay: ".5s",
    textWrap: "avoid"
  },

  ".bookmarkItem:hover > .iconDesc": {
    opacity: 1
  },

  ".bookmarkItem:not(:hover) > .iconDesc": {
    transition: "none"
  }

});