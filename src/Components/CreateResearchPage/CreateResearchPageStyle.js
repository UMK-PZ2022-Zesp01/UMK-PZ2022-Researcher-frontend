import { createUseStyles } from "react-jss";

export default createUseStyles({

  container: {
    maxWidth: "900px",
    margin: "100px auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  bookmarksContainer: {
    display: "flex",
    flexDirection: "row",
    width: "90%"
  },

  logo: {
    backgroundColor: "#512C8C",
    padding: "10px 15px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px"
  },

  logoImg: {
    height: "40px"
  },

  createResearchPanel: {
    width: "100%",
    padding: "50px",
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    borderRadius: "10px",
    backgroundColor: "#F4F0FA"
  }
});

